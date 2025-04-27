import { auth } from "@/auth";
import { ConnectDB } from "@/database/ConnectDB";
import { Expense } from "@/models/expense";
import { Income } from "@/models/income";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (req : NextRequest) {
    try {
        await ConnectDB();

        const updatedValues = await req.json();
    
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Not authenticated" });
        }
    
        const user = await User.findOne({_id : session.user.id})

        if(!user){
            return NextResponse.json({ error: "User does not exist......" });
        }


        if(updatedValues.type === "Income"){

            const transaction = await Transaction.findOne({_id : updatedValues._id})

            const findIncome = await Income.findByIdAndUpdate(transaction.income ,
                
            {
                $set: {
                    "source" : updatedValues.sourceCat,
                    "amount" : updatedValues.amount,
                    "date" : updatedValues.date
                }   
            }
            , {new : true})
            await findIncome.save()
            return NextResponse.json({message : "Updated!" , findIncome})
        }



        if(updatedValues.type === "Expense"){

            const transaction = await Transaction.findOne({_id : updatedValues._id})

            const findExpense = await Expense.findByIdAndUpdate(transaction.expense ,
                
            {
                $set: {
                    "category" : updatedValues.sourceCat,
                    "amount" : updatedValues.amount,
                    "date" : updatedValues.date
                }   
            }
            , {new : true})
            await findExpense.save()
            return NextResponse.json({message : "Updated!" , findExpense})
        }

        return NextResponse.json({ error: "Invalid transaction type" }, { status: 400 });

    } catch (error) {
        return NextResponse.json({error : "Could not update......."})
    }
}