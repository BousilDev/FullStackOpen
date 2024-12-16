import { useState } from 'react'

const Button = (props) => <button onClick={() => props.setState(props.state + 1)}>{props.name}</button>

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={total}></StatisticLine>
      <StatisticLine text="average" value={(good - bad) / (total)}></StatisticLine>
      <StatisticLine text="positive" value={String((good / total) * 100) + "%"}></StatisticLine>
    </table>
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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App