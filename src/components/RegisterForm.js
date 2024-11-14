"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignInBtn from "./SigninBtn";

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const emailFunc = (e)=>{
    setEmail(e.target.value)
    setError("")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      setLoading(true)
      const resUserExists = await fetch('api/userExists', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const { user } = await resUserExists.json()

      if (user) {
        setError("User already exists.")
        setLoading(false)
        return;
      }

      const res = await fetch('api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        router.push("/")
        setLoading(false)
      }
    } catch (error) {

    }
  }

  return (
    <div className="grid place-items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md shadow-lg p-6 rounded-lg border-t-4 border-green-400 bg-white">
        <h1 className="text-2xl font-semibold my-4 dark:text-gray-900 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border dark:text-gray-900 border-gray-200 py-2 px-4 bg-zinc-100/40 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Full Name"
          />
          <input
            required
            onChange={emailFunc}
            className="w-full dark:text-gray-900 border border-gray-200 py-2 px-4 bg-zinc-100/40 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Email"
          />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full dark:text-gray-900 border border-gray-200 py-2 px-4 bg-zinc-100/40 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Password"
          />
          
          <button className="bg-green-600 flex justify-center items-center gap-4 hover:bg-green-700 rounded text-white cursor-pointer px-6 py-2 mt-2 w-full text-center">{
            loading ?  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white-500 border-opacity-75">
            </div> :  "Register"
            }
          </button>
        </form>
        <div className="flex justify-center dark:text-gray-900 my-2">OR</div>
        <div className="flex justify-center my-2">
          <SignInBtn />
        </div>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4">
            {error}
          </div>
        )}
        <Link className="text-sm mt-4 flex dark:text-gray-900 justify-end" href={'/'}>
          Already have an account? <span className="ml-1 underline">Login</span>
        </Link>
      </div>
    </div>
  )
}
