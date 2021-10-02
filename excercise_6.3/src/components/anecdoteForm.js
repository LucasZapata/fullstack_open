import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const submitAnecdote = async (event) => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.anecdoteText.value))
        dispatch(showNotification(`added ${event.target.anecdoteText.value}`, 5))
    }

    return(
        <div>
            <h2>Add anecdote</h2>
            <form onSubmit={submitAnecdote}>
                <input name='anecdoteText'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
