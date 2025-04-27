import { auth } from "@/auth";
import { ConnectDB } from "@/database/ConnectDB";
import { Income } from "@/models/income";
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

        const findIncome = await Income.findByIdAndUpdate(updatedValues._id ,
                
        {
            $set: {
                    "source" : updatedValues.source,
                    "amount" : updatedValues.amount,
                    "date" : updatedValues.date
            }   
        }
        , {new : true})
        await findIncome.save()
        return NextResponse.json({message : "Updated!" , findIncome})
        
    } catch (error) {
        return NextResponse.json({error : "Could not update......."})
    }
}