import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import {
  addNotification,
  resetNotification
} from './reducers/notificationReducer'
import {
  setBlogs,
  addBlog,
  removeBlog,
  updateBlog
} from './reducers/blogReducer'
import { setUser, resetUser } from './reducers/userReducer'

import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { notification, type } = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  const showMessage = (msg, msgType) => {
    dispatch(addNotification({ notification: msg, type: msgType }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      showMessage('Logged in', 'success')
    } catch (exception) {
      showMessage('Wrong username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      dispatch(resetUser())
    } catch (exception) {
      showMessage('Logout failed', 'error')
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
      dispatch(addBlog(await blogService.create(blog)))
      showMessage(`${blog.title} by ${blog.author} added`, 'success')
    } catch (exception) {
      showMessage('Adding new blog failed', 'error')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'}>
      <BlogForm handleNewBlog={handleNewBlog} />
    </Togglable>
  )

  const handleBlogUpdate = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    delete updatedBlog.id
    await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleBlogRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <Notification message={notification} className={type} />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleBlogUpdate={handleBlogUpdate}
              handleBlogRemove={handleBlogRemove}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
