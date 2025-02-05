import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const ensureOrder = (state) => {
  return [...state].sort((a,b) => a.votes <= b.votes ? 1 : -1)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return ensureOrder(state.push(action.payload))
    },
    setAnecdotes(state, action) {
      return ensureOrder(action.payload)
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const createVote = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()    
    const noteToChange = anecdotes.find(n => n.id === id)
    const changedNote = { ...noteToChange, votes: noteToChange.votes + 1 }
    await anecdoteService.update(id, changedNote)
    dispatch(setAnecdotes(anecdotes.map(note => note.id === id ? changedNote : note)))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    return dispatch(appendAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export default anecdoteSlice.reducer