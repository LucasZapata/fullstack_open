import React from "react"
import { useHistory } from "react-router"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const history = useHistory()
    const contentField = useField('text')
    const authorField = useField('text')
    const infoField = useField('text')

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: contentField.value,
        author: authorField.value,
        info: infoField.value,
        votes: 0
      })
      history.push('/')
    }

    const reset = () => {
      contentField.reset()
      authorField.reset()
      infoField.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...contentField} />
          </div>
          <div>
            author
            <input {...authorField} />
          </div>
          <div>
            url for more info
            <input {...infoField} />
          </div>
          <button>create</button>
        </form>
        <button onClick = {reset}>Clear</button>
      </div>
    )
  
  }

  export default CreateNew