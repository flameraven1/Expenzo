"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SideBarTypes = {
  setOpen : (open : boolean)=>void
}

export default function SideBar({setOpen} : SideBarTypes) {
  const path = usePathname()
  const [openedLink, setOpenedLink] = useState(0);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-b from-blue-600 to-blue-800 w-full min-h-screen flex flex-col items-center justify-start`}>
        <span 
          onClick={() => setOpen(false)} 
          className='block md:hidden font-semibold text-white text-4xl absolute left-5 top-5 cursor-pointer'>
          &times;
        </span>

        <div className='w-full mt-20 gap-5 flex flex-col items-center justify-around'>
          <div>
            <h1 className='text-white font-sans font-bold text-3xl cursor-pointer tracking-wider mb-4'>
              Expenzo
            </h1>
          </div>

          <div className='md:w-[95%] w-full'>
            <ul className='flex flex-col justify-center items-center gap-6 w-full'>
              <Link href={"/dashboard"} onClick={() => setOpenedLink(1)} 
                className={`font-sans font-semibold text-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${openedLink === 1 || path === "/dashboard" ?  "text-blue-500 bg-white" : "text-white hover:bg-blue-500 hover:text-white"} p-3 w-full rounded-lg`}>
                Dashboard
              </Link>
              <Link href={"/dashboard/income"} onClick={() => setOpenedLink(2)} 
                className={`font-sans font-semibold text-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${openedLink === 2 || path === "/dashboard/income" ?  "text-blue-500 bg-white" : "text-white hover:bg-blue-500 hover:text-white"} p-3 w-full rounded-lg`}>
                Income
              </Link>
              <Link href={"/dashboard/expense"} onClick={() => setOpenedLink(3)} 
                className={`font-sans font-semibold text-xl text-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${openedLink === 3 || path === "/dashboard/expense" ?  "text-blue-500 bg-white" : "text-white hover:bg-blue-500 hover:text-white"} p-3 w-full rounded-lg`}>
                Expense
              </Link>
            </ul>
          </div>
        </div>
    </div>
  )
}
