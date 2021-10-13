import React, { useState } from 'react'
import { Switch, Route, useRouteMatch} from "react-router-dom"
import AnecdoteList from './components/AnecdoteList'
import About from './components/AboutPage'
import Footer from './components/Footer'
import CreateNew from './components/CreateForm'
import SingleAnecdote from './components/SingleAnecdote'
import Menu from './components/Menu'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  console.log('aaaa')

  let timeoutID = ''
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New anecdote: '${anecdote.content}'`)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => setNotification(''), 10000)
  }

  /* const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  } */

  let match = useRouteMatch('/list/:id')
  let single = match ? 
    anecdotes.find(an => String(an.id) === String(match.params.id)) : 
    null
  
  console.log('aaa', match, single)

  return (
    <div>
      <Menu />
      <p>{notification}</p>
      <Switch>
        <Route path={'/list/:id'}>
          <SingleAnecdote anecdote = {single}/>
        </Route>
        <Route path={'/new'}>
          <CreateNew addNew = {addNew}/>
        </Route>
        <Route path={'/about'}>
          <About />
        </Route>
        <Route path={'/'}>
          <AnecdoteList anecdotes = {anecdotes}/>
        </Route>
      </Switch>
      <Footer/>
    </div>
  )
}

export default App