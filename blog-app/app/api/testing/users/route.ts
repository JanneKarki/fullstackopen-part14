import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "../../../../db"
import { users } from "../../../../db/schema"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const { username, name, password } = await req.json()
  const passwordHash = await bcrypt.hash(password, 10)

  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning({ id: users.id, username: users.username, name: users.name })

  return NextResponse.json(user, { status: 201 })
}
