const SingleBlog = ({ blog, handleBlogUpdate, handleBlogRemove, user }) => {
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
    </div>
  )
}

export default SingleBlog
