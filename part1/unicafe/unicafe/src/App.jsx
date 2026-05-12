import { useState } from 'react'


const Button = props => {
  const { onClick , text } = props
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const Statistics = props => {

  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const total = good + bad + neutral
  const average = (good - bad) / total
  const positive = (good / total)

  if (total === 0) {
    return (
        <div>No feedback given</div>
    )
  }
    return (
        <table>
          <tbody>
            <StatisticsLine text="good" value={good}/>
            <StatisticsLine text="neutral" value={neutral}/>
            <StatisticsLine text="bad" value={bad}/>
            <StatisticsLine text="total" value={total}/>
            <StatisticsLine text="average" value={average}/>
            <StatisticsLine text="positive" value={positive}/>
          </tbody>
        </table>
    )
}



const StatisticsLine = props => {
  const text = props.text
  const value = props.value
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    console.log(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    console.log(updatedBad)
  }

  return (

      <div>
        <h1>
          give feedback
        </h1>
        <Button onClick={handleGoodClick} text='left'></Button>
        <Button onClick={handleNeutralClick} text='neutral'></Button>
        <Button onClick={handleBadClick} text='bad'></Button>
        <h1>
          statistics
        </h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  )
}

export default App