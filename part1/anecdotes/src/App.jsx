import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handlePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    return setPoints(copy)
  }
  const maxValue = Math.max(...points)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br></br>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={handlePoints}>vote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[points.findIndex((v) => v === maxValue)]}</p>
      <p>has {maxValue} votes</p>
    </div>
  )
}

export default App