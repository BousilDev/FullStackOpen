import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addVote } from './requests'
import { useNotificationDispatch } from './CounterContext'

const App = () => {

  const queryClient = useQueryClient()

  const newVoteMutation = useMutation({ 
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote)
    dispatch({type: "SET", payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({type: "NULL"})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isPending ) {
    return <div>loading...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
