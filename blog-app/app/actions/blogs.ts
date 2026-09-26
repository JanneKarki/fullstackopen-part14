"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog, getBlogById } from "../services/blogs"
import { auth } from "@/auth"
import { getCurrentUser } from "../services/session"
import {
  addToReadingList,
  isInReadingList,
  markAsRead,
} from "../services/readingList"

export type BlogFormState = {
  errors?: { title?: string; author?: string; url?: string }
  values?: { title: string; author: string; url: string }
  success?: boolean
}

export const createBlog = async (
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: BlogFormState["errors"] = {}
  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters"
  }
  if (!url || url.length < 5) {
    errors.url = "Url must be at least 5 characters"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { success: true }
}

export const likeBlogAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const id = Number(formData.get("id"))
  const blog = await getBlogById(id)
  if (!blog || blog.userId === user.id) {
    return
  }

  if (!(await isInReadingList(user.id, id))) {
    await addToReadingList(user.id, id)
  }

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/me")
}

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const id = Number(formData.get("id"))
  await markAsRead(user.id, id)

  revalidatePath("/me")
}
