import { SignIn } from "@/components/sign-in"

export default function Login() {
  return (
    <div className="inset-0 fixed flex justify-center items-center bg-black/50">

      <div className="w-[30%] h-[60%] flex flex-col justify-center items-center gap-3 bg-white">
      <h1 className="text-2xl font-bold font-sans">Login</h1>
        <SignIn />
      </div>
    </div>
  )
}
