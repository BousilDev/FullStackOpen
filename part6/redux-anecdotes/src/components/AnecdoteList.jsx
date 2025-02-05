import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => 
        anecdotes.filter(d => d.content.includes(filter))
    )
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch(createVote(id))
      dispatch(setNotification(`you voted ${anecdotes.find(d => d.id === id).content}`, 10))
    }

    return (
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
    )
  }

  export default AnecdoteList