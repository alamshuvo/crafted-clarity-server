const express =require("express");
const cors = require("cors");
const app=express();
const port =process.env.PORT || 5000;


// Middlewere 
app.use(cors());
app.use(express.json())




// 
app.get("/",async(req,res)=>{
    res.send("crafted-clarity-server is running")
})

app.listen(port,()=>{
    console.log(`crafted-clarity-server is running on port ${port}`);
})
