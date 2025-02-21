import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser() {
      return initialState
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
