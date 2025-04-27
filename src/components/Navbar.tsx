"use client"

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import SignOut from './signOut/SignOut'

type NavTypes = {
  setOpen: (open: boolean) => void
}

export default function Navbar({ setOpen }: NavTypes) {
  const [openSignOut, setOpenSignOut] = useState(false);
  const { data } = useSession();

  return (
    <div className="w-full h-full px-6 md:px-12 py-4 flex justify-between items-center rounded-xl shadow-lg">
    
      <span 
        onClick={() => setOpen(true)} 
        className="md:hidden block cursor-pointer font-semibold text-3xl transition transform hover:scale-110">
        ☰
      </span>

      <p className="font-sans text-2xl font-semibold">
        Hi, {data?.user?.name?.split(" ")[0]}!
      </p>

      <div className="relative w-[50px] h-[50px] rounded-full cursor-pointer">
        <img 
          onClick={() => setOpenSignOut(!openSignOut)} 
          className="object-cover w-full h-full rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:brightness-110"
          src={data?.user?.image || '/path/to/placeholder-image.png'}
          alt="User Image"
        />

        {openSignOut && <SignOut />}
      </div>
    </div>
  )
}
