const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")
const dotenv  = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json())
app.use(cors()) 

const PORT = process.env.PORT || 8080

//schema
const createSchema = mongoose.Schema({
    name:String,
    email:String,
    mobile:String
},{timestamps:true})

const userModel = mongoose.model("user",createSchema)

mongoose
    .connect(process.env.MONGO_URL,{ dbName:"crudoperation"})
    .then(()=> console.log("Database Connected"))
    .catch((err) => console.log(err))

//http://localhost:8080/
app.get("/",async(req,res)=>{
    const data = await userModel.find({});
    res.json({
        success:true,
        message : "Response Data:",
        data
    })
})

//create save data : http://localhost:8080/create
/*
{
  "name":"komal",
  "email":"xyz@gmail.com",
  "mobile":9922454585
}
*/
app.post("/create",async (req,res) => {
    //console.log( req.body)
    const data = await userModel.create(req.body)
    res.json({
        success:true,
        message:"Record created" ,
        data
    })
})

//Update update : http://localhost:8080/update
/*
{
  "id":"6799d547329a2c6ad3d8cdf7",
  "name":"komal Kharche"
}
*/
app.put("/update",async (req,res) => {
    const {_id, ...rest} = req.body
    const data = await userModel.updateOne(
        {_id:_id},rest)
    res.json({
        success:true,
        message:"Record updated" ,
        data    
    })
})

//Delete : http://localhost:8080/delete/6799d547329a2c6ad3d8cdf7
app.delete("/delete/:id",async (req,res) => {
    const id = req.params.id
    const data = await userModel.deleteOne({_id:id})
    res.json({
        success:true,
        message:"Record deleted" ,
        data    
    })
})
app.listen(PORT,()=>console.log("Server is running"))