import React, { useState } from 'react'

const Header = ({text}) => <div><p>{text}</p></div>

const Statistic = ({label, num}) => <tr><td>{label}</td> <td>{num}</td></tr>

const FeedbackButton = ({text, call}) => {
  return  <button onClick = {call}>{text}</button>
}

const History = (props) =>{
  if (props.good > 0 || props.neutral > 0 || props.bad > 0)
    {return(<StatBlock good = {props.good} neutral = {props.neutral} bad = {props.bad} />)}
  else
    {return(<p>No feedback given</p>)}
}

const StatBlock = ({good, neutral, bad}) =>{
  let total = good+neutral+bad
  return(
  <table>
    <Statistic label = 'good' num = {good} />
    <Statistic label = 'neutral' num = {neutral} />
    <Statistic label = 'bad' num = {bad} />
    <Statistic label = 'total' num = {total} />
    <Statistic label = 'average' num = {(good-bad)/total} />
    <Statistic label = 'positive' num = {String(good/total*100)+'%'} />
  </table>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const name = 'give feedback'
  const statHeader = 'statistics'
  

  return (
    
    <div>
      <h1><Header text = {name}/></h1>
      <FeedbackButton call = {() => setGood(good+1)} text = 'good' />
      <FeedbackButton call = {() => setNeutral(neutral+1)} text = 'bad' />
      <FeedbackButton call = {() => setBad(bad+1)} text = 'good' />
      <h1><Header text = {statHeader}/></h1>
      <History good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
