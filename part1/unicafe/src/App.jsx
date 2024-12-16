import { useState } from 'react'

const Button = (props) => {
  return <button onClick={() => props.setState(props.state + 1)}>{props.name}</button>
}

const Stats = (props) => {
  return <p>{props.name} {props.state}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={'good'} state={good} setState={setGood}></Button>
      <Button name={'neutral'} state={neutral} setState={setNeutral}></Button>
      <Button name={'bad'} state={bad} setState={setBad}></Button>
      <h1>statistics</h1>
      <Stats name={'good'} state={good}></Stats>
      <Stats name={'neutral'} state={neutral}></Stats>
      <Stats name={'bad'} state={bad}></Stats>
    </div>
  )
}

export default App