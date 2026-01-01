import mongoose from 'mongoose'
import { MONGO_URL } from './envConfig.js';


const ConnectDB =async()=>{
    try{
        if(!MONGO_URL){
        console.log("Url not found")
        return;
    }
    const URL = MONGO_URL
        await mongoose.connect(URL)
        console.log("Database connected")
    }catch(error){
        console.error("Database connection failed")
    }
}

export default ConnectDB;