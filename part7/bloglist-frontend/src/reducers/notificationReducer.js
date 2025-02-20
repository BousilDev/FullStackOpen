import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: null,
  type: 'error'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return { ...action.payload }
    },
    resetNotification() {
      return initialState
    }
  }
})

export const { addNotification, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer
