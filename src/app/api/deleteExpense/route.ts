import { ConnectDB } from "@/database/ConnectDB";
import { Expense } from "@/models/expense";
import { Transaction } from "@/models/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req : NextRequest) {
    try {
        await ConnectDB();
        const selectedItem = await req.json()
        await Expense.findByIdAndDelete(selectedItem._id)
        await Transaction.findByIdAndDelete(selectedItem.transactionID)
        return NextResponse.json({message : "Deleted"})

    } catch {
        return NextResponse.json({error : "Error. Could not be deleted......."})
    }
}