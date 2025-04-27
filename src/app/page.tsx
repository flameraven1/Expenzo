"use client"

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center md:flex-row bg-gradient-to-r from-blue-400 to-blue-600">

      <div className="md:w-[45%] w-[50%] md:h-[80%] h-[30%] relative overflow-hidden rounded-lg shadow-xl">
        <Image 
          src="/images/front.jpg" 
          alt="front cover" 
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-110"
          width={600} 
          height={600} 
        />
      </div>

      <div className="md:w-[55%] w-[90%] flex flex-col justify-center items-center text-center mt-10 md:mt-0 space-y-6">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Expenzo
        </h1>
        <h2 className="text-4xl font-semibold text-white">
          Stay on track.
        </h2>
        <h2 className="text-4xl font-semibold text-white">
          Stay in control.
        </h2>

        <p className="text-lg md:text-xl font-medium text-white max-w-md mx-auto drop-shadow-lg">
          Track your income and expenses with ease! Stay on top of your finances by setting goals, monitoring spending, and visualizing your progress with interactive charts. Sign in with Google and start managing your budget today!
        </p>

        <Link href={"/dashboard"} className="mt-6 px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 transition-all duration-300">
          Get Started
        </Link>
      </div>
    </div>
  )
}
