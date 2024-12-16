import { useState } from 'react'

const Button = (props) => {
  return <button onClick={() => props.setState(props.state + 1)}>{props.name}</button>
}

const Stats = (props) => {
  return <p>{props.name} {props.state}</p>
}

const StatsUnit = (props) => {
  return <p>{props.name} {props.state} {props.unit}</p>
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <Stats name={'good'} state={good}></Stats>
      <Stats name={'neutral'} state={neutral}></Stats>
      <Stats name={'bad'} state={bad}></Stats>
      <Stats name={'all'} state={total}></Stats>
      <Stats name={'average'} state={(good - bad) / (total)}></Stats>
      <StatsUnit name={'positive'} state={(good / total) * 100} unit={'%'}></StatsUnit>
    </div>
  )
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App