import { useState } from 'react'

const Blog = ({ blog, handleBlogUpdate }) => {
  
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
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{labelName}</button>
      {visible && 
        <div>
          {blog.url}
          <br></br>
          {blog.likes}
          <button onClick={() => handleBlogUpdate(blog)}>like</button>
          <br></br>
          {blog.author}
        </div>
      }
    </div>
)}

export default Blog