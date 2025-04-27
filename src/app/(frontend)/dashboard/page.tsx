"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import {
  ExpenseType,
  IncomeType,
  TransactionType,
  fetchUserData,
} from "@/lib/features/userSlice";
import { useIncomeExpenseContext } from "@/components/IncomeExpenseContext";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import DeleteORUpdate from "@/components/DeleteORUpdate";

// Type Guards
function isIncome(data: IncomeType | ExpenseType | undefined): data is IncomeType {
  return data !== undefined && 'source' in data;
}

function isExpense(data: IncomeType | ExpenseType | undefined): data is ExpenseType {
  return data !== undefined && 'category' in data;
}

export default function Dashboard() {
  const [filterForYear, setFilterForYear] = useState(
    new Date().getFullYear().toString()
  );
  const { entireUserData } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { totalExpense, totalIncome } = useIncomeExpenseContext();
  const [updateDeleteTab, setUpdateDeleteTab] = useState(false);
  const [storeSelectedItem, setStoreSelectedItem] = useState<TransactionType | {}>({});

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const extractYearsIncome: number[] = entireUserData.income.map((item) =>
    new Date(item.date).getFullYear()
  );

  const extractYearsExpense: number[] = entireUserData.expense.map((item) =>
    new Date(item.date).getFullYear()
  );

  const totalYears: number[] = Array.from(
    new Set([...extractYearsExpense, ...extractYearsIncome])
  ).sort((a, b) => a - b);

  const handleClick = (item: TransactionType) => {
    setUpdateDeleteTab(true);
    setStoreSelectedItem(item);
  };

  const transactionsToShow = entireUserData.transaction.slice();

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-50">
      {updateDeleteTab && (
        <DeleteORUpdate
          setUpdateDeleteTab={setUpdateDeleteTab}
          updateDeleteTab={updateDeleteTab}
          storeSelectedItem={storeSelectedItem}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
        <div className="w-[80%] sm:w-[45%] bg-green-100 p-4 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-lg font-semibold text-green-900">
            Income: PKR {totalIncome}
          </p>
        </div>
        <div className="w-[80%] sm:w-[45%] bg-red-100 p-4 rounded-xl shadow-md flex items-center justify-center">
          <p className="text-lg font-semibold text-red-900">
            Expense: PKR {totalExpense}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="w-full bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
            <select
              onChange={(e) => setFilterForYear(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {totalYears.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-72">
            <IncomeExpenseChart
              filterForYear={filterForYear}
              entireUserData={entireUserData}
            />
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">All Transactions</h1>
          <div className="w-full max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full table-fixed text-center border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-gray-700 font-semibold">S.No</th>
                  <th className="p-3 text-gray-700 font-semibold">Date</th>
                  <th className="p-3 text-gray-700 font-semibold">Type</th>
                  <th className="p-3 text-gray-700 font-semibold">Source</th>
                  <th className="p-3 text-gray-700 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionsToShow.map((item: TransactionType, index) => {
                  const data = item.type === "Income" ? item.income : item.expense;

                  let sourceOrCategory = "N/A";
                  let formattedDate = "N/A";
                  let amount = "N/A";

                  // Check if data is IncomeType
                  if (isIncome(data)) {
                    sourceOrCategory = data.source;
                    formattedDate = data?.date
                      ? new Date(data.date).toLocaleDateString()
                      : "N/A";
                    amount = String(data?.amount ?? "N/A");  // Make sure amount is a string
                  } 
                  // Check if data is ExpenseType
                  else if (isExpense(data)) {
                    sourceOrCategory = data.category;
                    formattedDate = data?.date
                      ? new Date(data.date).toLocaleDateString()
                      : "N/A";
                    amount = String(data?.amount ?? "N/A");  // Make sure amount is a string
                  }

                  return (
                    <tr
                      onClick={() => handleClick(item)}
                      key={item._id}
                      className="hover:bg-gray-50 cursor-pointer transition-all duration-200"
                    >
                      <td className="p-3 border-b">{index + 1}</td>
                      <td className="p-3 border-b">{formattedDate}</td>
                      <td className="p-3 border-b">{item.type}</td>
                      <td className="p-3 border-b">{sourceOrCategory}</td>
                      <td className="p-3 border-b">Rs {amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}