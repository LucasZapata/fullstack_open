import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { ALL_BOOKS, USER_DATA } from '../queries'

const Recommended = (props) => {
  const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS)
  const [getUserData, userResult] = useLazyQuery(USER_DATA)
    
  useEffect(() => {
    if (props.logged)
      getUserData()
  }, [props.logged])

  useEffect(() => {
    if (userResult.called && !userResult.loading){
      getBooks({variables:{genre:userResult.data.me.favoriteGenre}})}
  }, [userResult.data])

  if (!props.show) {
    return null
  }

  if (!bookResult || bookResult.loading)
    return(<div>Loading...</div>)

  return (
    <div>
      <h2>Recommended books</h2>
      <p>{props.genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookResult.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended