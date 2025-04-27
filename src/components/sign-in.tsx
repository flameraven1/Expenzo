"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export function SignIn() {
  return (
    <button 
      className="flex items-center justify-center bg-white border-2 border-gray-300 rounded-full w-[80%] p-4 gap-3 hover:bg-gray-100 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
      onClick={() => signIn("google", { redirectTo: "/dashboard" })}
    >
      <div className="w-6 h-6 relative">
        <Image src="/images/google.png" alt="Google Logo" layout="fill" objectFit="contain" />
      </div>
      <p className="text-gray-700 font-semibold text-md">Sign in with Google</p>
    </button>
  )
}
