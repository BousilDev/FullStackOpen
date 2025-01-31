import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemove, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const labelName = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle} data-testid='blogElement'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{labelName}</button>
      {visible &&
        <div>
          {blog.url}
          <br></br>
          <div className='likes'>
            {blog.likes}
            <button onClick={() => handleBlogUpdate(blog)}>like</button>
          </div>
          {blog.user.name}
          {blog.user.username === user.username &&
          <div>
            <button onClick={() => handleBlogRemove(blog)}>remove</button>
          </div>
          }
        </div>
      }
    </div>
  )}

export default Blog