import express from 'express';
const app=express();
app.get('/',(req,res)=>{
    res.send("probably server is ready")
});

const port=process.env.PORT ||3000;

app.get('/api/joke',(req,res)=>{
    const joke=[
        {
            id:1,
            title:"1",
            content:"1"
        },{
            id:2,
            title:"2",
            content:"2"
        },{
            id:3,
            title:"3",
            content:"3"
        },{
            id:4,
            title:"4",
            content:"4"
        },{
            id:5,
            title:"5",
            content:"5"
        }

    ]
    res.send(joke)
})

app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
});