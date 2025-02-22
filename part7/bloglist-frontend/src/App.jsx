import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'
import userService from './services/users'
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
import { Route, Routes, useMatch } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  const userMatch = useMatch('/users/:id')
  const selectedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const selectedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

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
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {blogForm()}
                  {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                </div>
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route
              path="/users/:id"
              element={<SingleUser user={selectedUser} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <SingleBlog
                  blog={selectedBlog}
                  handleBlogUpdate={handleBlogUpdate}
                  handleBlogRemove={handleBlogRemove}
                  user={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
