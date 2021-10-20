import { gql  } from '@apollo/client'

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
    query {
        allBooks {
            title
            published
            author
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
    }`