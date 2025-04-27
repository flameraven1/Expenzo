"use client";

import { userIncomeExpenseContext } from "@/components/IncomeExpenseContext";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { ExpenseType, fetchUserData } from "@/lib/features/userSlice";
import ChartExpense from "@/components/ChartExpense";
import DeleteORUpdateExpense from "@/components/expense/DeleteORUpdateExpense";

export default function Expense() {
  const [updateDeleteTab, setUpdateDeleteTab] = useState(false);
  const [storeSelectedItem, setStoreSelectedItem] = useState<ExpenseType | {}>({});
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  const dispatch = useAppDispatch();

  const fetchDataForExpense = async () => {
    await dispatch(fetchUserData());
  };

  useEffect(() => {
    fetchDataForExpense();
  }, []);

  const { totalExpense } = userIncomeExpenseContext();
  const { entireUserData } = useAppSelector((state: RootState) => state.user);

  const extractYearsExpense = entireUserData.expense.map((item) => new Date(item.date).getFullYear());
  const totalYears = Array.from(new Set(extractYearsExpense)).sort((a, b) => a - b);

  const handleClick = (item: ExpenseType) => {
    setUpdateDeleteTab(true);
    setStoreSelectedItem(item);
  };

  const allExpenses = entireUserData.expense;

  const filteredExpenses = selectedYear
    ? allExpenses.filter((item) => new Date(item.date).getFullYear().toString() === selectedYear)
    : allExpenses;

  return (
    <div className="w-full h-full px-4">
      {updateDeleteTab ? (
        <DeleteORUpdateExpense
          setUpdateDeleteTab={setUpdateDeleteTab}
          updateDeleteTab={updateDeleteTab}
          storeSelectedItem={storeSelectedItem}
        />
      ) : null}

      {/* Total Expense */}
      <div className="w-full h-[15%] flex justify-center items-center px-5 mb-4">
        <div className="bg-red-400 w-full md:w-[40%] h-[60%] flex items-center justify-center p-6 rounded-xl shadow-xl">
          <p className="text-lg font-semibold text-white">
            Expense: PKR {totalExpense}
          </p>
        </div>
      </div>

      {/* Expense Overview */}
      <div className="w-full h-[85%]">
        <div className="w-full h-[55%] bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Expense Overview</h1>
            <select
              className="border rounded-md px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear}
            >
              {totalYears.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full h-[90%]">
            <ChartExpense
              filterForYear={selectedYear || new Date().getFullYear().toString()}
              entireUserData={entireUserData}
            />
          </div>
        </div>

        {/* Expense Transactions */}
        <div className="w-full h-[45%] bg-white mt-4 rounded-xl shadow-lg p-6 overflow-hidden">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Expense Transactions</h1>

          <div className="w-full h-[90%] overflow-y-auto">
            <table className="w-full text-center table-auto border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-3 border border-gray-300">S.No</th>
                  <th className="p-3 border border-gray-300">Date</th>
                  <th className="p-3 border border-gray-300">Category</th>
                  <th className="p-3 border border-gray-300">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((item: ExpenseType, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(item)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <td className="p-3 border border-gray-300">{index + 1}</td>
                    <td className="p-3 border border-gray-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-gray-300">{item.category}</td>
                    <td className="p-3 border border-gray-300">
                      PKR {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}