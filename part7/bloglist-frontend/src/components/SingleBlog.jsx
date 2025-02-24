import blogService from '../services/blogs'
import { useEffect, useState } from 'react'

const SingleBlog = ({ blog, handleBlogUpdate, handleBlogRemove, user }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (blog && blog.comments) {
      setComments(blog.comments)
    }
  }, [blog])

  const handleComment = async (event) => {
    event.preventDefault()
    await blogService.addComment(blog.id, comment)
    setComments(comments.concat(comment))
    setComment('')
  }

  if (!blog) {
    return <p>no blog found</p>
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href="blog.url">{blog.url}</a>
      <br></br>
      <div className="likes">
        {blog.likes} likes
        <button onClick={() => handleBlogUpdate(blog)}>like</button>
      </div>
      added by {blog.user.name}
      {blog.user.username === user.username && (
        <div>
          <button onClick={() => handleBlogRemove(blog)}>remove</button>
        </div>
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlog
