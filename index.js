const express =require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app=express();
const port =process.env.PORT || 5000;


// Middlewere 
app.use(cors());
app.use(express.json())


// add craft item
// app.get("/craft", async (req,res)=>{
  
// })


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.x9xlpou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const craftCollection=client.db("craftDB").collection("craft")

  
  // all craft
     app.get("/craft",async(req,res)=>{
     const cursor=craftCollection.find();
     const result = await cursor.toArray();
     res.send(result);
     })
  // single craft iteam by id
  app.get("/craft/:id",async(req,res)=>{
    const id =req.params.id;
    const quary={_id:new ObjectId(id)};
    const result=await craftCollection.findOne(quary);
    res.send(result)
  })


    app.post("/craft",async(req,res)=>{
      const newCraft=req.body;
      console.log(newCraft);
      const result=await craftCollection.insertOne(newCraft)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// 
app.get("/",async(req,res)=>{
    res.send("crafted-clarity-server is running")
})

app.listen(port,()=>{
    console.log(`crafted-clarity-server is running on port ${port}`);
})
