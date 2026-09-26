import { redirect } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "../services/session"
import { getReadingList } from "../services/readingList"
import { generateToken } from "../actions/users"
import { markAsReadAction } from "../actions/blogs"

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((entry) => !entry.read)
  const read = readingList.filter((entry) => entry.read)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div data-testid="user-profile" className="border rounded p-6 space-y-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p>
          <span className="font-semibold">Name:</span>{" "}
          <span data-testid="user-name">{user.name}</span>
        </p>
        <p>
          <span className="font-semibold">Username:</span>{" "}
          <span data-testid="user-username">{user.username}</span>
        </p>
        <hr />
        <div data-testid="reading-list-section" className="space-y-4">
          <h3 className="text-xl font-semibold">Reading List</h3>
          {readingList.length === 0 ? (
            <p data-testid="empty-reading-list" className="text-gray-600">
              Your reading list is empty
            </p>
          ) : (
            <>
              <div data-testid="unread-section" className="space-y-2">
                <h4 className="text-lg font-semibold">
                  Unread ({unread.length})
                </h4>
                {unread.length === 0 ? (
                  <p data-testid="no-unread-blogs" className="text-gray-600">
                    No unread blogs
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {unread.map((entry) => (
                      <li
                        key={entry.id}
                        className="bg-yellow-50 rounded p-3 flex items-center justify-between gap-4"
                      >
                        <Link
                          href={`/blogs/${entry.blog.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {entry.blog.title}
                        </Link>
                        <form action={markAsReadAction}>
                          <input type="hidden" name="id" value={entry.id} />
                          <button
                            type="submit"
                            data-testid={`mark-read-${entry.id}`}
                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                          >
                            mark as read
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div data-testid="read-section" className="space-y-2">
                <h4 className="text-lg font-semibold">Read ({read.length})</h4>
                <ul className="space-y-2">
                  {read.map((entry) => (
                    <li key={entry.id} className="bg-green-50 rounded p-3">
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {entry.blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <hr />
        <div data-testid="api-token-section" className="space-y-4">
          <h3 className="text-xl font-semibold">API Token</h3>
          <div className="bg-gray-50 rounded p-4">
            {user.token ? (
              <div data-testid="token-display">
                <p className="text-gray-600 mb-2">Current token:</p>
                <code
                  data-testid="api-token"
                  className="block bg-gray-100 rounded p-2 font-mono break-all"
                >
                  {user.token}
                </code>
              </div>
            ) : (
              <p data-testid="no-token-message" className="text-gray-600">
                No token has been generated yet
              </p>
            )}
          </div>
          <form action={generateToken}>
            <button
              type="submit"
              data-testid="generate-token-button"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Generate New Token
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MePage
