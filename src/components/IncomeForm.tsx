import { useState } from "react";
import { addIncomeTransactions, fetchUserData } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hook";
import { Bounce, toast } from "react-toastify";
import { useIncomeExpenseContext } from "./IncomeExpenseContext";

export default function IncomeForm() {
  const [inputs, setInputs] = useState({
    source: "",
    amount: 0,
    date: new Date(),
  });

  const dispatch = useAppDispatch();
  const { setTotalIncome, totalIncome } = useIncomeExpenseContext();

  const handleAddIncome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setTotalIncome(totalIncome + inputs.amount);
      await dispatch(addIncomeTransactions(inputs));
      await dispatch(fetchUserData());

      toast.success("Income Added!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    } catch{
      toast.error("Failed to add income.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <form onSubmit={handleAddIncome} className="flex flex-col gap-6">
      {/* Source Input */}
      <div className="flex flex-col">
        <label htmlFor="source" className="text-gray-700 font-semibold mb-2">
          Source
        </label>
        <input
          id="source"
          type="text"
          placeholder="e.g., Salary, Freelance"
          value={inputs.source}
          onChange={(e) => setInputs({ ...inputs, source: e.target.value })}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Amount Input */}
      <div className="flex flex-col">
        <label htmlFor="amount" className="text-gray-700 font-semibold mb-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="e.g., 5000"
          value={inputs.amount}
          onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Date Input */}
      <div className="flex flex-col">
        <label htmlFor="date" className="text-gray-700 font-semibold mb-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          onChange={(e) => setInputs({ ...inputs, date: new Date(e.target.value) })}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
      >
        Add Income
      </button>
    </form>
  );
}
