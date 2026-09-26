"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog, BlogFormState } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const initialState: BlogFormState = {}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block">
            <span className="block mb-1">Title</span>
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              className="border rounded px-3 py-1 w-full"
            />
          </label>
          {state.errors?.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="block mb-1">Author</span>
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              className="border rounded px-3 py-1 w-full"
            />
          </label>
          {state.errors?.author && (
            <p className="text-red-600 text-sm mt-1">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label className="block">
            <span className="block mb-1">URL</span>
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              className="border rounded px-3 py-1 w-full"
            />
          </label>
          {state.errors?.url && (
            <p className="text-red-600 text-sm mt-1">{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
