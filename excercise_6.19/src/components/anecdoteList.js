import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    if (filter !== '')
      anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().search(filter) !== -1)
    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(voteAction(anecdote))
      dispatch(showNotification(`voted ${anecdote.content}`, 5))
    }
    
    return (
        <div>
          <h2>Anecdotes</h2>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}
export default AnecdoteList