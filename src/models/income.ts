import mongoose from "mongoose"

const incomeSchema = new mongoose.Schema({
    source : { type : String},
    amount : { type : Number},
    date : { type: Date},
    userID : {type : mongoose.Schema.ObjectId , ref : "User" , required : true},
    transactionID : {type : mongoose.Schema.ObjectId , ref : "Transaction"},
} , {timestamps : true})

export const Income = mongoose.models.Income || mongoose.model("Income" , incomeSchema)