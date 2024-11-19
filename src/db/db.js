import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`mongoDB connected !! DB host : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log('mongodb connection failed : ', error)
        process.exit(1) // we can use exit(code) or we can use throw error as well
    }
}

export default connectDB