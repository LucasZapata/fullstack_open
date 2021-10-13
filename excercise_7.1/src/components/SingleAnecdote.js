import React from "react"

const SingleAnecdote = (props) => {
    console.log(props)
    return (
    <div>
      <h2>{props.anecdote.content}</h2>
      <p>by {props.anecdote.author}</p>
      <p>{props.anecdote.info}</p>
    </div>
  )}

export default SingleAnecdote