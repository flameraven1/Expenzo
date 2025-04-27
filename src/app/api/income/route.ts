import { auth } from "@/auth";
import { ConnectDB } from "@/database/ConnectDB";
import { Income } from "@/models/income";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";
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

        const newIncome = new Income({
        source : userInputs.source,
        amount : userInputs.amount,
        date : userInputs.date,
        userID : session.user.id
        })

        await newIncome.save();

        const newTransaction = new Transaction({
            income: newIncome._id,
            userID : session.user.id,
            type: "Income"
          })

          
        await newTransaction.save(); 

        const updatingIncome = await Income.findByIdAndUpdate(newIncome._id , {
            $set : {
                transactionID : newTransaction._id
            }
        } ,
            {new : true})

        return NextResponse.json({message : "Added!" , addingIncome : updatingIncome , transaction : newTransaction})
    } catch (error) {
        return NextResponse.json({error : "Could not add income......."})
    }
}