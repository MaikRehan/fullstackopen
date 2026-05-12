import { useState, useEffect } from 'react'

const Button = props => {
  const { onClick , text } = props
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const AnecdoteWithMostVotes = props => {
  const votes = props.votes
  const anecdotes = props.anecdotes
  const maxVotes = Math.max(...votes)
  const indexOfMaxVotes = votes.indexOf(maxVotes)

  if (maxVotes === 0) {
    return (
        <div>
          No votes were made yet
        </div>
    )
  }
  return (
      <div>
        {anecdotes[indexOfMaxVotes]}
      </div>
  )
}



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

  const [selected, setSelected] = useState(0,)
  const [votes, setVotes] = useState ([0, 0, 0, 0, 0, 0, 0, 0])

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = (props) => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log(copyVotes)
    setVotes(copyVotes)
  }


  return (
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
        <p>
          <Button onClick={handleVote} text="Vote"/>
          <Button onClick={handleNextAnecdote} text='Next anecdote'/>
        </p>
        <h2>Quote with most votes</h2>
        <AnecdoteWithMostVotes votes={votes} anecdotes={anecdotes}/>
      </div>
  )
}

export default App