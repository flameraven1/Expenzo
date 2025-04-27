import { auth } from "@/auth";
import { ConnectDB } from "@/database/ConnectDB";
import { Expense } from "@/models/expense";
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

        const findExpense = await Expense.findByIdAndUpdate(updatedValues._id ,
                
        {
            $set: {
                    "category" : updatedValues.category,
                    "amount" : updatedValues.amount,
                    "date" : updatedValues.date
            }   
        }
        , {new : true})
        await findExpense.save()
        return NextResponse.json({message : "Updated!" , findExpense})
        
    } catch {
        return NextResponse.json({error : "Could not update......."})
    }
}