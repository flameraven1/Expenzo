"use client"

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-blue-600 py-10">

      <div className="flex flex-col md:flex-row items-center justify-between md:w-[85%] max-w-screen-lg px-5 space-y-10 md:space-y-0 gap-10">

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-2xl">
            <Image 
              src="/images/front.jpg" 
              alt="front cover" 
              className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
              width={600} 
              height={600} 
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Expenzo
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Stay on track. Stay in control.
          </h2>
          <p className="text-lg text-white mb-6 max-w-xl mx-auto">
            Track your income and expenses with ease! Stay on top of your finances by setting goals, monitoring spending, and visualizing your progress with interactive charts. Sign in with Google and start managing your budget today!
          </p>

          <Link href={"/dashboard"} className="cursor-pointer px-6 py-3 bg-green-500 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
