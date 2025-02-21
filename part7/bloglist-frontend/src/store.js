import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer
  }
})

store.subscribe(() => console.log(store.getState()))

export default store
