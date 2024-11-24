import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'



const app = express()

// app.use(cors()) -> not good practice
// there are some options as well

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true,
    }
))

app.use(express.json({limit : "16kb"})) // we are accepting the json request with limit of 16kb

app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))// folder where static resources are located


app.use(cookieParser())//store and remove cookie for client side only by the server

//routes import

import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users",userRouter) //base/api/v1/users/


export default app