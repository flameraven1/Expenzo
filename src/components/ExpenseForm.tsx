import { useState } from "react";
import { addExpenseTransactions, fetchUserData } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { useIncomeExpenseContext } from "./IncomeExpenseContext";
import { Bounce, toast } from "react-toastify";

let storeExpense = 0;

export default function ExpenseForm() {
  const { setTotalExpense } = useIncomeExpenseContext();
  const [inputs, setInputs] = useState({
    category: "",
    amount: 0,
    date: new Date(),
  });

  const dispatch = useAppDispatch();

  const AddExpense = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    storeExpense += Number(inputs.amount);
    setTotalExpense(storeExpense);

    await dispatch(addExpenseTransactions(inputs));

    dispatch(fetchUserData())
      .then(() => {
        toast.success("Expense Added!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch(() => {
        toast.error("Error. Could not be added...", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <form action="" className="w-full h-full flex flex-col justify-center items-center gap-8 p-6">
      
      <div className="w-full flex flex-col gap-6">

        <div className="flex flex-col w-full">
          <label htmlFor="category" className="text-gray-700 font-semibold mb-2">
            Category
          </label>
          <input
            onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-blue-400 transition-all duration-200"
            type="text"
            name="category"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="amount" className="text-gray-700 font-semibold mb-2">
            Amount
          </label>
          <input
            onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-blue-400 transition-all duration-200"
            type="number"
            name="amount"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="date" className="text-gray-700 font-semibold mb-2">
            Date
          </label>
          <input
            onChange={(e) => setInputs({ ...inputs, date: new Date(e.target.value) })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-blue-400 transition-all duration-200"
            type="date"
            name="date"
          />
        </div>

      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={AddExpense}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300"
        >
          Add Expense
        </button>
      </div>

    </form>
  );
}
