const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/users')
const { args } = require('commander')

const mongodb_uri = 'mongodb+srv://test_user:test_password@cluster0.swjwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const password = 'password'
const key = 'KEY'
mongoose.connect(mongodb_uri)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/* let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
] */

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

/* let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
] */

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id:ID!
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id:ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
      ):Book
    addBirthYear(
      name: String!
      born: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    me: (root, args, context) => {return context.currentUser},
    allBooks: async (root, args) => {
      if (args.author && args.genre)
        return await Book.find({author:args.author, genres:args.genre}).populate('author')
      else if (args.author)
        return await Book.find({author:args.author}).populate('author')
      else if (args.genre)
        return await Book.find({genres:args.genre}).populate('author')
      else
        return Book.find({}).populate('author')},
    allAuthors: async () => {
      return await Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => await Book.countDocuments({author:root._id})
  },
  Mutation: {
    addBook: async(root, args, context) => {
      if (!context.currentUser){
        throw 'User unauthorized'
      }
      const book = new Book({...args})
      let authorExists = await Author.findOne({name:args.author})
      if (!authorExists){
        newAuthor = new Author({name: args.author})
        try{await newAuthor.save()}
        catch (error){throw new UserInputError(error.message, {invalidArgs: args,})}
        book.author = newAuthor._id
      }
      else {
        book.author = authorExists._id
        console.log('B')
      }
      try{await book.save()}
      catch (error){throw new UserInputError(error.message, {invalidArgs: args,})}
      return book
    },
    addBirthYear: async(root, args, context) => {
      if (!context.currentUser){
        throw 'User unauthorized'
      }
      const author = await Author.findOne({name:args.name})
      if (!author) return null
      author.born = args.born
      try{await author.save}
      catch (error){throw new UserInputError(error.message, {invalidArgs: args,})}
      return author
    },
    createUser: async(root, args, context) => {
      const user = new User({...args})
      try{await user.save()}
      catch (error){throw new UserInputError(error.message, {invalidArgs: args,})}
    },
    login: async(root, args) => {
      const user = await User.findOne({username:args.username})
      if (!user || args.password !== password){
        throw new UserInputError("wrong credentials")
      }
      const userToken = {username: user.username, id: user._id}
      return{value: jwt.sign(userToken,key)}
      }
    }
  }


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), key)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    } 
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})