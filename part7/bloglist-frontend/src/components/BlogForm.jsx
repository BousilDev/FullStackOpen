import { useState } from 'react'
import { Input, Button } from '../styled'

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
        <Input
          type="text"
          value={value}
          name={name}
          onChange={({ target }) => setValue(target.value)}
          id={id}
          data-testid={id}
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
    <span>
      <h2>create new</h2>
      <form style={{ display: 'inline' }} onSubmit={addBlog}>
        {inputField(title, 'title', setTitle, 'title-input')}
        {inputField(author, 'author', setAuthor, 'author-input')}
        {inputField(url, 'url', setUrl, 'url-input')}
        <Button type="submit">create</Button>
      </form>
    </span>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
