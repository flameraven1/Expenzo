import { useState } from "react";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

type TransactionTypes = {
  setOpenAddTransactions: (open: boolean) => void;
};

export default function TransactionForm({ setOpenAddTransactions }: TransactionTypes) {
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="w-[90%] md:w-[40%] h-[85%] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Add New Transaction</h1>
            <button
              onClick={() => setOpenAddTransactions(false)}
              className="text-white text-3xl leading-none hover:text-red-300"
            >
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setActiveTab("income")}
              className={`flex-1 py-2 rounded-lg text-white font-semibold ${
                activeTab === "income" ? "bg-white text-blue-500" : "hover:bg-blue-400"
              } transition`}
            >
              Income
            </button>
            <button
              onClick={() => setActiveTab("expense")}
              className={`flex-1 py-2 rounded-lg text-white font-semibold ${
                activeTab === "expense" ? "bg-white text-blue-500" : "hover:bg-blue-400"
              } transition`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "income" ? <IncomeForm /> : <ExpenseForm />}
        </div>
      </div>
    </div>
  );
}
