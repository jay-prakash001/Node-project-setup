import dotenv from 'dotenv'
import connectDB from "./db/db.js"; //'.package/file.js'
import app from './app.js';

dotenv.config(
    { path: './env' }
)
const PORT = process.env.PORT || 8000
// just like onSuccessListener and .onFailureListener
connectDB()
    .then(()=>{
        app.on('error',(error)=>{
            console.log('ERRR ',error)
            throw error
        })
        
        app.listen(PORT,()=>{
            console.log(`app is running on ${PORT}`);
            
        })

    }).catch((err) => {
        console.log("mongoDB connection failed : ", er)
    })










































// First approach to connect to db
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from 'express'
const app = express()
; (async () => {

    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log(error)
            throw error
        })
app.listen(process.env.PORT, ()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})
    } catch (error) {
        console.error(error)
        throw error
    }
})()
    
*/