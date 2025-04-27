import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    income : {type : mongoose.Schema.ObjectId , ref : "Income"},
    expense : {type : mongoose.Schema.ObjectId , ref : "Expense"},
    userID : {type : mongoose.Schema.ObjectId , ref : "User" , required : true},
    type : {type : String , required : true}
} , {timestamps : true})

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction" , transactionSchema)