
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import UserForm from './components/UserForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState('')
  
  const logout = () => {
    setToken('')
    localStorage.removeItem('user-token')
  }

  useEffect(() => logout(),[])

  const login = (token) => {
    setToken(token)
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== '' && <button onClick={() => setPage('add')}>add book</button>}
        {token === '' && <button onClick={() => setPage('login')}>User login</button>}
        {token !== '' && <button onClick={() => logout()}>Logout</button>}
        {token !== '' && <button onClick={() => setPage('recommended')}>Recommended</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <UserForm
        setToken={login} show={page === 'login'}
      />

      <Recommended
        logged={!(!token)} show={page === 'recommended'}
      />

    </div>
  )
}

export default App