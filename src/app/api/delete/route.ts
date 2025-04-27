import { ConnectDB } from "@/database/ConnectDB";
import { Expense } from "@/models/expense";
import { Transaction } from "@/models/transaction";
import { Income } from "@/models/income";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req : NextRequest) {
    try {
        await ConnectDB();
        const selectedItem = await req.json()

        if(selectedItem.type === "Income"){
            await Transaction.findByIdAndDelete(selectedItem._id)
            await Income.findByIdAndDelete(selectedItem.income._id)
            return NextResponse.json({message : "Deleted"})
        }

        if(selectedItem.type === "Expense"){
            await Transaction.findByIdAndDelete(selectedItem._id)
            await Expense.findByIdAndDelete(selectedItem.expense._id)
            return NextResponse.json({message : "Deleted"})
        }

    } catch (error) {
        return NextResponse.json({error : "Error. Could not be deleted......."})
    }
}