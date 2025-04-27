import mongoose from "mongoose";

export const ConnectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
    } catch (error) {
        console.log(error)
    }
}