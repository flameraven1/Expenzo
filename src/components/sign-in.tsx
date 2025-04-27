"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
 
export function SignIn() {
  return (
    <button className="flex justify-center items-center cursor-pointer border-1 border-gray-300 w-[80%] h-[10%] p-4 gap-3 hover:bg-gray-200" onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
      <Image className="" src="/images/google.png" alt="" width={23} height={23}/> <p>Sign in with Google</p>
    </button>
  )
}