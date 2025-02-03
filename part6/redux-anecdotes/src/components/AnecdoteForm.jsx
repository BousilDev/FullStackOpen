import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

  const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      showMessage(`you created ${content}`)
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
    }

    const showMessage = msg => {
      dispatch(setNotification(msg))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
    
    return (
      <div>
        <h2>create new</h2>
          <form onSubmit={addAnecdote}>
            <div>
              <input name='anecdote'/>
            </div>
            <button type='submit'>create</button>
          </form>
      </div>
    )
  }

export default AnecdoteForm