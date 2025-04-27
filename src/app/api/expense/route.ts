import { auth } from "@/auth";
import { ConnectDB } from "@/database/ConnectDB";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";
import { Expense } from "@/models/expense";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req : NextRequest) {
    try {
        await ConnectDB();
    
        const userInputs = await req.json();
    
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Not authenticated" });
        }
    
        const user = await User.findOne({_id : session.user.id})

        if(!user){
            return NextResponse.json({ error: "User does not exist......" });
        }

        const newExpense = new Expense({
        category : userInputs.category,
        amount : userInputs.amount,
        date : userInputs.date,
        userID : session.user.id
        })

        await newExpense.save();

        const newTransaction = new Transaction({
            expense: newExpense._id,
            userID : session.user.id,
            type: "Expense"
          })

        await newTransaction.save()


        const updatingExpense = await Expense.findByIdAndUpdate(newExpense._id , {
                    $set : {
                        transactionID : newTransaction._id
                    }
                } ,
            {new : true}
        )

        return NextResponse.json({message : "Added!" , updatingExpense, transaction : newTransaction})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : "Could not add expense......."})
    }
}