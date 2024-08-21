import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
      const connect = await mongoose.connect("mongodb+srv://shravyakmp:shravyasri123@olx.8rto8.mongodb.net/?retryWrites=true&w=majority&appName=OLX")
      console.log("connected to DB")
    }
    catch(err){
        console.log(err)
    }
}

export default connectDB