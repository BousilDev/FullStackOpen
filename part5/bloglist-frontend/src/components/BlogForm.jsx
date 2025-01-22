import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef((props, refs) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetStates = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const inputField = (value, name, setValue) => {
    return (
      <div>
        {name}:
        <input
          type="text"
          value={value}
          name={name}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
    )
  }

  useImperativeHandle(refs, () => {
    return { blog: {
      title: title,
      author: author,
      url: url
    }, resetStates
    }
  })

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.handleNewBlog}>
        {inputField(title, 'title', setTitle)}
        {inputField(author, 'author', setAuthor)}
        {inputField(url, 'url', setUrl)}
        <button type="submit">create</button>
      </form>
    </div>
  )
}
)

BlogForm.displayName = 'BlogForm'

export default BlogForm