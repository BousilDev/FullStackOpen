import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return initialState
        }
    }
})

const { putNotification, removeNotification } = notificationSlice.actions

export const setNotification = (msg, time) => {
    return async dispatch => {
        dispatch(putNotification(msg))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 1000 * time)
    }
}

export default notificationSlice.reducer