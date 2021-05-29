import React, { useState } from 'react'

const Header = () => <h2>give feedback</h2>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistic = ({ text , value, extra }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {extra}</td>
    </tr>
  )
}

const Statistics = ({ options, good, neutral, bad}) => {

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  if (total < 1) {
    return (
      <>
        <h3>statistics</h3>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>

    <h3>statistics</h3>

    <table>
      <tbody>
        <Statistic text={options[0]} value={good} />
        <Statistic text={options[1]} value={neutral} />
        <Statistic text={options[2]} value={bad} />

        <Statistic text="all" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} extra="%" />
      </tbody>
    </table>
  
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const options = ["good", "neutral", "bad"]

  return (
    <div>
      <Header />
      <Button text={options[0]} handleClick={handleGood}/>
      <Button text={options[1]} handleClick={handleNeutral}/>
      <Button text={options[2]} handleClick={handleBad}/>
      <Statistics options={options} good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
