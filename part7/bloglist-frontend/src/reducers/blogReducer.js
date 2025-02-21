import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      sortBlogs(blogs)
      return blogs
    },
    addBlog(state, action) {
      const blogs = state.concat(action.payload)
      sortBlogs(blogs)
      return blogs
    },
    removeBlog(state, action) {
      const blogs = state.filter((blog) => blog.id !== action.payload.id)
      sortBlogs(blogs)
      return blogs
    },
    updateBlog(state, action) {
      const blogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
      sortBlogs(blogs)
      return blogs
    }
  }
})

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions

export default blogSlice.reducer
