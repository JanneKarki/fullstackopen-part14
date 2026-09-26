"use client"

import { useActionState } from "react"
import { registerUser, RegisterFormState } from "../actions/users"

const initialState: RegisterFormState = {}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            <span className="block mb-1">Username</span>
            <input
              type="text"
              name="username"
              required
              className="border rounded px-3 py-1 w-full"
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors?.username && (
            <p data-testid="username-error" className="text-red-600 text-sm mt-1">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="block mb-1">Name</span>
            <input
              type="text"
              name="name"
              required
              className="border rounded px-3 py-1 w-full"
              defaultValue={state.values?.name}
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
          {state.errors?.password && (
            <p data-testid="password-error" className="text-red-600 text-sm mt-1">
              {state.errors.password}
            </p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="block mb-1">Confirm Password</span>
            <input
              type="password"
              name="passwordConfirm"
              required
              className="border rounded px-3 py-1 w-full"
            />
          </label>
          {state.errors?.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="text-red-600 text-sm mt-1"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}
