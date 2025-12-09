require('dotenv').config();
const express = require('express')
const app = express()
//const port = 3000

const git=[
  "Apple",
  "Banana",
  "Cherry"
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/twitte',(req,res)=>{
    res.send('wasif_genz')
})

app.get('/login',(req,res)=>{
  res.send('l')
})
app.get('/yt',(req,res)=>{
  res.send("<h2>send</h2>")
})
app.get("/github",(req,res)=>{
  res.json(git)
})



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
