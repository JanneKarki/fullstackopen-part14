import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlogAction } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>{blog.likes} likes</p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage
