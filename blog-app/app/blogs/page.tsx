import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = (await getBlogs()).sort((a, b) => b.likes - a.likes)
  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action="/blogs" className="mb-4 flex gap-2">
        <input
          type="text"
          name="filter"
          data-testid="filter-input"
          defaultValue={filter}
          className="border rounded px-3 py-1 flex-1"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
        >
          search
        </button>
      </form>
      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>{" "}
            by {blog.author}
            <span className="ml-2 text-gray-500">{blog.likes} likes</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs
