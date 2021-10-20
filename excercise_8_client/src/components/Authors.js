import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {ALL_AUTHORS, ADD_BIRTH_YEAR} from '../queries'

const Authors = (props) => {
  const [authorInput, setAuthorInput] = useState('')
  const [yearInput, setYearInput] = useState('')
  const [addBirthYear] = useMutation(ADD_BIRTH_YEAR)
  
  const authors = useQuery(ALL_AUTHORS)
  
  
  const changeYear = (event) => {
    event.preventDefault()
    addBirthYear({ variables: { name:authorInput, born:yearInput }})
  }
  
  if (!props.show) {
    return null
  }

  if (authors.loading) 
    return(<div>...Loading</div>)

  
  console.log(authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={changeYear}>
        <select value = {authorInput} onChange = {({target}) => setAuthorInput(target.value)}>
          {authors.data.allAuthors.map(a => 
            <option value = {a.name}>{a.name}</option>)}
        </select> <br/>
        <input type='number' value = {yearInput} onChange={({ target }) => setYearInput(parseInt(target.value))}/>
        <button type='submit'>Change year</button>
      </form>
    </div>
  )
}

export default Authors
