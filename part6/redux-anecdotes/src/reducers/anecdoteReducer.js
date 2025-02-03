import { createSlice } from '@reduxjs/toolkit'

const ensureOrder = (state) => {
  return [...state].sort((a,b) => a.votes <= b.votes ? 1 : -1)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createVote(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { ...noteToChange, votes: noteToChange.votes + 1 }
      return ensureOrder(state.map(note => note.id === id ? changedNote : note))
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      return ensureOrder(state.concat(anecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createVote, createAnecdote, appendAnecdot, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer