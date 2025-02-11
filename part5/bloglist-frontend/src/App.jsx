import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)

  const showMessage = msg => {
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const refreshBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }

  useEffect(() => {
    refreshBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      showMessage('Wrong username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (exception) {
      setMessageType('error')
      showMessage('Logout failed')
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />

    )
  }

  const handleNewBlog = async (blog) => {
    try {
      await blogService.create(blog)
      refreshBlogs()
      setMessageType('success')
      showMessage(`${blog.title} by ${blog.author} added`)
    } catch (exception) {
      setMessageType('error')
      showMessage('Adding new blog failed')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'}>
      <BlogForm handleNewBlog={handleNewBlog}/>
    </Togglable>
  )

  const handleBlogUpdate = async blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    delete updatedBlog.id
    await blogService.update(blog.id, updatedBlog)
    refreshBlogs()
  }

  const handleBlogRemove = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      refreshBlogs()
    }
  }

  return (
    <div>
      <Notification message={message} className={messageType} />

      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} user={user}/>
          )}
        </div>
      }
    </div>
  )
}

export default App