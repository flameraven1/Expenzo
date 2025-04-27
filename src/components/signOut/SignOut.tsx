import { signOut, useSession } from "next-auth/react";

export default function SignOut() {
  const {data} = useSession();
    return (
      <div className="absolute top-12 right-12 w-[22rem] bg-white shadow-2xl flex flex-col justify-center items-center gap-6 z-50 p-8 rounded-2xl border border-gray-200 transition-all duration-300">
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">You are logged in as</h2>
          <p className="text-gray-500 text-sm italic">{data?.user?.email}</p>
        </div>
  
        <button onClick={()=>signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-xl transition duration-200 cursor-pointer">
          Sign Out
        </button>
        
      </div>
    )
  }
  