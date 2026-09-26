"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("logged in")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p data-testid="error-message" className="text-red-600 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            <span className="block mb-1">Username</span>
            <input
              type="text"
              name="username"
              required
              className="border rounded px-3 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="block mb-1">Password</span>
            <input
              type="password"
              name="password"
              required
              className="border rounded px-3 py-1 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
