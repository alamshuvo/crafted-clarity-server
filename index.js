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
 
    const craftCollection=client.db("craftDB").collection("craft")

  
  // all craft
     app.get("/craft",async(req,res)=>{
     const cursor=craftCollection.find();
     const result = await cursor.toArray();
     res.send(result);
     })
  // single craft iteam by id
  app.get("/craft/id/:id",async(req,res)=>{
    const id =req.params.id;
    const quary={_id:new ObjectId(id)};
    const result=await craftCollection.findOne(quary);
    res.send(result)
  })
 
  // update
  app.put("/craft/id/:id",async(req,res)=>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const option={upsert:true};
    const updateCraft=req.body;
    console.log(updateCraft);
    const craft={
      $set:{
        photo:updateCraft.photo,
        item:updateCraft.item,
        selectCategory:updateCraft.selectCategory,
        price:updateCraft.price,
        customization:updateCraft.customization,
        rating:updateCraft.rating,
        stockStatus:updateCraft.stockStatus,
        processing_time:updateCraft.processing_time,
        description:updateCraft.description,
        name:updateCraft.name,
        email:updateCraft.email,
      }
    }
    const result =await craftCollection.updateOne(filter,craft,option);
    res.send(result)
  })


    app.post("/craft",async(req,res)=>{
      const newCraft=req.body;
      console.log(newCraft);
      const result=await craftCollection.insertOne(newCraft)
      res.send(result)
    })
    // single user data list by email
    app.get(`/craft/email/:email`,async(req,res)=>{
      const emaila=req.params.email;
      console.log(emaila);
      // const quary={email:new ObjectId(emaila)}
      const result=await craftCollection.find({email:req.params.email}).toArray()
      // // console.log(result);
      res.send(result)
    })
    // app.get(`/craft/updateid/:updateid`,async(req,res)=>{
    //   const updateida=req.params.updateid;
    //   console.log(updateida);
    //   // const quary={email:new ObjectId(emaila)}
    //   const result=await craftCollection.find({uid:req.params.updateid}).toArray()
    //   // // console.log(result);
    //   res.send(result)
    // })

      //  delete one 
      app.delete("/craft/id/:id",async(req,res)=>{
        const id =req.params.id;
        const quary={_id : new ObjectId(id)}
        const result= await craftCollection.deleteOne(quary);
        res.send(result);
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
