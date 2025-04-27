"use client";

import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import React, { ReactElement, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import { IncomeExpenseProvider } from "@/components/IncomeExpenseContext";

export default function DashBoardLayout({
  children,
}: {
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [openAddTransactions, setOpenAddTransactions] = useState(false);
  return (
    <IncomeExpenseProvider>
      <div className="min-w-dvw min-h-screen flex">
        {openAddTransactions && (
          <>
            <TransactionForm setOpenAddTransactions={setOpenAddTransactions} />
          </>
        )}
        <div
          className={`
     w-full fixed z-50 min-h-dvh
    transition-transform duration-500 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:relative md:w-[20%] md:translate-x-0
  `}
        >
          <SideBar setOpen={setOpen} />
        </div>
        <div className="flex flex-col md:w-[80%] w-full min-h-screen">
          <div className="w-full h-[7%]">
            <Navbar setOpen={setOpen} />
          </div>

          <div className="w-full h-[90%]">
            {children}
            <span
              onClick={() => setOpenAddTransactions(true)}
              className="w-12 h-12 flex justify-center items-center fixed bottom-10 right-10 text-4xl font-semibold text-white bg-blue-500 p-4 rounded-[100%] shadow-2xl cursor-pointer hover:bg-blue-400 z-40"
            >
              +
            </span>
          </div>
        </div>
      </div>
    </IncomeExpenseProvider>
  );
}
