import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment bookDetails on Book {
        title
        published
        author{
            name
        }
    }`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query ($genre:String){
        allBooks(genre:$genre) {
            ...bookDetails
            }
        }
    ${BOOK_DETAILS}`

export const USER_DATA = gql`
  query {
      me{
          username
          favoriteGenre
      }
  }
`

export const ADD_BOOK = gql`
    mutation Mutation($title: String!, $author: String!, $genres: [String], $published: Int) {
        addBook(title: $title, author: $author, genres: $genres, published: $published) {
        title
        }
    }
`

export const ADD_BIRTH_YEAR = gql`
    mutation Mutation($name: String!, $born: Int!) {
        addBirthYear(name:$name, born:$born) {name, born}
    }
`

export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`