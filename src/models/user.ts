import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique: true},
    income: { type: Array, default: [] },
    expense: { type: Array, default: [] },
    transaction : {type : Array , default : []}
} , {timestamps : true})

export const User = mongoose.models.User || mongoose.model("User" , userSchema)