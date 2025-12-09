require('dotenv').config();
const express = require('express')
const app = express()
//const port = 3000

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
  "<h2>chai</h2>"
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
