import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Todo from './Schema/TodoSchema.js';
mongoose.connect(process.env.MONGO_URI) .then(()=>{
    console.log("connected to database");
})   

const app=express();
app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.send("hello you are at the server");
});

app.post("/addtodo", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title is required" });
  }

  try {
    const newTodo = await Todo.create({ title, content });

    res.status(201).json({
      id: newTodo._id,
      title: newTodo.title,
      content: newTodo.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.post("/deletetodo", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const result = await Todo.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ message: "todo not found" });
  }

  res.status(200).json({ id });
});


app.post("/gettodos",async(req,res)=>{
  try{
    const result=await Todo.find({});
    if(!result){
      res.status(404).json({message:"no todos found"});
    }

   const todos= result.map((item)=>{
    return {
      id:item._id,
      title:item.title,
      content:item.content
    }
   });
   res.status(201).json(todos);

  }catch(error){
    res.status(500).json({message:"internal server error"});
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is live");
});






