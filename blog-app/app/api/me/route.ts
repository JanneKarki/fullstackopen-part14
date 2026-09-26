import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "../../services/users"

export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authorization.substring(7)
  const user = await getUserByToken(token)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs.map((blog) => ({
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })),
  })
}
