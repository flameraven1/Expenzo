import { SignIn } from "@/components/sign-in"

export default function Login() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">

      <div className="w-[90%] md:w-[400px] h-[70%] flex flex-col justify-center items-center gap-6 bg-white rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
        
        <h1 className="text-3xl font-semibold text-gray-700 text-center">Login</h1>

        <p className="text-lg text-gray-500 text-center mb-6">
        Please sign in to continue.
        </p>

        <SignIn />
      </div>
    </div>
  )
}
