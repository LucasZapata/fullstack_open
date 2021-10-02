import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ( props ) => {

    const submitAnecdote = async (event) => {
        event.preventDefault()
        props.addAnecdote(event.target.anecdoteText.value)
        props.showNotification(`added ${event.target.anecdoteText.value}`, 5)
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

const mapStateToProps = (state) =>{
    return {addAnecdote: state.addAnecdote,
        showNotification: state.showNotification}
}

const connectAnecdoteForm = connect(mapStateToProps, {addAnecdote, showNotification})(AnecdoteForm)

export default connectAnecdoteForm
