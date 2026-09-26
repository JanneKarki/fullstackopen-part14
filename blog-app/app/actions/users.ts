"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { getCurrentUser } from "../services/session"

export type RegisterFormState = {
  errors?: {
    username?: string
    password?: string
    passwordConfirm?: string
  }
  values?: { username: string; name: string }
}

export const registerUser = async (
  prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: RegisterFormState["errors"] = {}
  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters"
  } else {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (existingUser) {
      errors.username = "Username is already taken"
    }
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  await db
    .update(users)
    .set({ token: crypto.randomUUID() })
    .where(eq(users.id, user.id))

  revalidatePath("/me")
}
