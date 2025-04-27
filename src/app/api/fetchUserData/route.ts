import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { User } from "@/models/user";
import { Income } from "@/models/income";
import { Expense } from "@/models/expense";
import { Transaction } from "@/models/transaction";
import { ConnectDB } from "@/database/ConnectDB";

export async function GET () { 
    try {
        await ConnectDB();
        const session = await auth();
        if(!session) return NextResponse.json({error : "User not authenticated...."})
        const userID = session?.user?.id

        const findUser = await User.findOne({_id : userID})

        if(!findUser){
            return NextResponse.json({ error: "User does not exist......" })
        }

        const getIncome = await Income.find({userID : findUser._id}).sort({ createdAt: -1 })
        const getExpense = await Expense.find({userID : findUser._id}).sort({ createdAt: -1 })
        const allTransactions = await Transaction.find({ userID: findUser._id })
        .populate("income")
        .populate("expense")
        .sort({ createdAt: -1 })

        return NextResponse.json({income : getIncome , expense : getExpense , transaction : allTransactions})

    } catch (error) {
        return NextResponse.json({error : "Could not be fetched......"});
    }
}