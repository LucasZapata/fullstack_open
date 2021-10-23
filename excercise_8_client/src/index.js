import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
    ApolloClient, ApolloProvider, createHttpLink,  InMemoryCache  } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const link = createHttpLink({ uri: 'http://localhost:4000' })

const authLink = setContext(async (_, {headers}) => {
  const token = localStorage.getItem('user-token')
  return{
    headers: {
      ...headers, 
      any:'aaaaa', 
      authorization: token ? `bearer ${token}` : '' 
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
})
  


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root'))