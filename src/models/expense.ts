import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    category : { type : String},
    amount : { type : Number},
    date : { type: Date},
    userID : {type : mongoose.Schema.ObjectId , ref : "User" , required : true},
    transactionID : {type : mongoose.Schema.ObjectId , ref : "Transaction"}
} , {timestamps : true})

export const Expense = mongoose.models.Expense || mongoose.model("Expense" , expenseSchema)