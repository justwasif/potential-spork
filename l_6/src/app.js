import express from 'express'
import cors from "cors"
import cookirParser from "cookie-parser"
import { Router } from 'express'


const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use
export{app}

import useRouter from "./routes/user.routes.js";

app.use("/api/v1/user",useRouter)
