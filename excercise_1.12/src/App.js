import React, { useState } from 'react'

const Button = ({text, call}) => {
  return  <button onClick = {call}>{text}</button>}

const Votes = ({votes}) => <div><p>Has {votes} votes</p></div>



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [vote_count, setVotes] = useState(Array(7).fill(0))
  const [selected, setSelected] = useState(0)
  let max = 0
  let max_index = 0

  const add_vote = (num) => {
    const copy = [...vote_count]
    copy[num] += 1
    return copy 
  }
  const GetMostVoted = () =>{
    for (var i = 0; i < vote_count.length; i++) {
      if (vote_count[i] > max){
        max = vote_count[i]
        max_index = i
      }
    }
    return(max_index)
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Votes votes = {vote_count[selected]}/>
      <br></br>
      <Button text = 'next anecdote' call = {() => setSelected(Math.floor(Math.random()*anecdotes.length))}/>
      <Button text = 'vote' call = {() => setVotes(add_vote(selected))}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[GetMostVoted()]}
    </div>
  )
}

export default App
