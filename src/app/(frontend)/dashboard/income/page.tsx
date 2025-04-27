"use client"

import { userIncomeExpenseContext } from "@/components/IncomeExpenseContext";
import React, { useEffect, useState } from "react";
import ChartIncome from "@/components/ChartIncome";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { fetchUserData, IncomeType } from "@/lib/features/userSlice";
import DeleteORUpdateIncome from "@/components/income/DeleteORUpdateIncome";

export default function Income() {
  const [updateDeleteTab, setUpdateDeleteTab] = useState(false);
  const [storeSelectedItem, setStoreSelectedItem] = useState<IncomeType | {}>({});
  const dispatch = useAppDispatch();

  const { totalIncome } = userIncomeExpenseContext();
  const { entireUserData } = useAppSelector((state: RootState) => state.user);

  const extractYearsIncome = entireUserData.income
    .map((item) => {
      const date = new Date(item.date);
      return date.getFullYear() && !isNaN(date.getTime()) ? date.getFullYear() : null;
    })
    .filter(year => year !== null);

  const totalYears = Array.from(new Set(extractYearsIncome)).sort((a, b) => b - a);

  const [filterForYear, setFilterForYear] = useState(
    totalYears.length > 0 ? totalYears[0].toString() : new Date().getFullYear().toString()
  );

  useEffect(() => {
    const fetchDataForIncome = async () => {
      await dispatch(fetchUserData());
    };
    fetchDataForIncome();
  }, [dispatch]);

  const handleClick = (item: IncomeType) => {
    setUpdateDeleteTab(true);
    setStoreSelectedItem(item);
  };

  return (
    <div className="w-full h-full px-6 py-4 bg-gray-50">
      {updateDeleteTab ? (
        <DeleteORUpdateIncome
          setUpdateDeleteTab={setUpdateDeleteTab}
          updateDeleteTab={updateDeleteTab}
          storeSelectedItem={storeSelectedItem}
        />
      ) : null}

      <div className="flex justify-center items-center mb-6">
        <div className="bg-green-300 w-full md:w-[40%] flex items-center justify-center p-4 rounded-xl shadow-lg">
          <p className="text-lg font-semibold text-green-900">
            Total Income: PKR {totalIncome}
          </p>
        </div>
      </div>

      <div className="w-full h-[80%]">
        <div className="w-full h-[55%] bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium text-gray-800">Income Overview</h1>
            <select
              onChange={(e) => setFilterForYear(e.target.value)}
              value={filterForYear}
              className="border rounded-lg px-4 py-2 text-lg"
            >
              {totalYears.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full h-[90%]">
            <ChartIncome
              filterForYear={filterForYear}
              entireUserData={entireUserData}
            />
          </div>
        </div>

        <div className="w-full h-[45%] bg-white rounded-xl shadow-lg p-6 overflow-hidden">
          <h1 className="text-2xl font-medium text-gray-800 mb-4">
            All Income Transactions
          </h1>

          <div className="w-full h-[90%] overflow-y-auto">
            <table className="w-full text-center table-auto border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="hover:bg-gray-200">
                  <th className="p-3 border border-gray-300 text-gray-700">S.No</th>
                  <th className="p-3 border border-gray-300 text-gray-700">Date</th>
                  <th className="p-3 border border-gray-300 text-gray-700">Source</th>
                  <th className="p-3 border border-gray-300 text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {entireUserData.income.map((item: IncomeType, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(item)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-3 border border-gray-300">{index + 1}</td>
                    <td className="p-3 border border-gray-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 border border-gray-300">{item.source}</td>
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
