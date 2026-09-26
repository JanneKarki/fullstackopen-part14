import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { getCurrentUser } from "../../services/session"
import { isInReadingList } from "../../services/readingList"
import { likeBlogAction, addToReadingListAction } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const user = await getCurrentUser()
  const canAddToReadingList =
    !!user &&
    blog.userId !== user.id &&
    !(await isInReadingList(user.id, blog.id))

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6 space-y-3">
      <h2 data-testid="blog-title" className="text-2xl font-bold">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-gray-500">
        {blog.author}
      </p>
      <p>
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <div className="flex items-center gap-3">
        <span>{blog.likes} likes</span>
        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            like
          </button>
        </form>
        {canAddToReadingList && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              add to reading list
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default BlogPage
