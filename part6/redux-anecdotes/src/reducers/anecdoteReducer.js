import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const ensureOrder = (state) => {
  return [...state].sort((a,b) => a.votes <= b.votes ? 1 : -1)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createVote(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { ...noteToChange, votes: noteToChange.votes + 1 }
      return ensureOrder(state.map(note => note.id === id ? changedNote : note))
    },
    createAnecdote(state, action) {
      const anecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return ensureOrder(state.concat(anecdote))
    }
  }
})

export const { createVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer