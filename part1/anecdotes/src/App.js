import React, { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project make it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState([0, 0, 0, 0, 0, 0])

  const nextQuote = () => setSelected(Math.floor(Math.random() * 6))

  const vote = () => {
    const copy = [...allVotes]
    copy[selected] += 1
    setAllVotes(copy)
  }

  const mostPopular = () => {
    const highest = allVotes.reduce((a, b) => Math.max(a, b)) 
    return allVotes.indexOf(highest)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <p>has {allVotes[selected]} votes</p>
      <div>
        <Button handleClick={vote} text="vote" />
        <Button handleClick={nextQuote} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostPopular()]}
      <p>has {allVotes[mostPopular()]} votes</p>
    </div>
  );
}

export default App;
