import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetStates = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const inputField = (value, name, setValue, id) => {
    return (
      <div>
        {name}:
        <input
          type="text"
          value={value}
          name={name}
          onChange={({ target }) => setValue(target.value)}
          id={id}
        />
      </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: title,
      author: author,
      url: url
    })
    resetStates()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        {inputField(title, 'title', setTitle, 'title-input')}
        {inputField(author, 'author', setAuthor, 'author-input')}
        {inputField(url, 'url', setUrl, 'url-input')}
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm