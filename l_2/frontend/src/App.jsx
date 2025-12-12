import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes,setjokes]=useState([])
  useEffect(()=>{
     axios.get("/api/joke")
     .then((response)=>{setjokes(response.data)}).catch((error)=>{console.log(error);}) 
  })
     
  
  return(
    <>
      <h1>hi</h1>
      <p>jokes:{jokes.length}</p>
      {
        jokes.map((joke)=>(
          <div key={joke.id}>
            <h3>
              {joke.title}
            </h3>
            <p>
              {joke.content}
            </p>

          </div>
        ))
      }
    </>
  )
}

export default App
