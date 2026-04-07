import React, { useState } from 'react'
import './App.css'
const App = () => {
  const [title,setTitle]=useState("");
  const[content,setContent]=useState("");
const [list,setList]=useState([]);

const AddTodo=async()=>{
  if(!title || !content){
    alert("title and content is required");
    return;
  }
  try{
    const res=await fetch("http://localhost:5000/addtodo",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,content})

    })
    const data=await res.json();
    if(res.status==201){
      setList((prev)=>[...prev,data]);
      setTitle("");
      setContent("");
    }
  }catch(error){
    alert("error in adding the todo",error);
  }
}

const DeleteTodo=async(id)=>{
  if(!id){
    alert("not a valid item");
    return;
  }

  try{
    const result= await fetch("http://localhost:5000/deletetodo",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    const data=await result.json();
    if(result.status==200){
      setList((prev)=>prev.filter((item)=>item.id!==data.id));
    }
  }catch(error){
    alert("error in deleting the todo",error);
  }
}
    return (
    <div id="container">
  <div id="input-container">
    <div id="input" className='glass'>
      <h1>Todo App</h1>

      <label>Title</label>
      <input
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Content</label>
      <input
        type="text"
        placeholder="Enter the content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={AddTodo}>Add Todo</button>
    </div>
  </div>

  <div id="list-container" className='glass'>
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          {item.title} : {item.content}
          <button onClick={() => DeleteTodo(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
</div>
  )
}

export default App
