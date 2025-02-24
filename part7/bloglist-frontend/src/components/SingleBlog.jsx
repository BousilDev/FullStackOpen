import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import { Ul, Li, Input, SmallButton as Button, CancelButton } from '../styled'

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
        <Button onClick={() => handleBlogUpdate(blog)}>like</Button>
      </div>
      added by {blog.user.name}
      {blog.user.username === user.username && (
        <div>
          <CancelButton onClick={() => handleBlogRemove(blog)}>
            remove
          </CancelButton>
        </div>
      )}
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <Input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button type="submit">add comment</Button>
      </form>
      <Ul>
        {comments.map((comment) => (
          <Li key={comment}>{comment}</Li>
        ))}
      </Ul>
    </div>
  )
}

export default SingleBlog
