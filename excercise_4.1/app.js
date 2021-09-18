const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Blog = require('./models/Blog')
const BlogRouter = require('./controllers/blogs')
const UserRouter = require('./controllers/users')
const LoginRouter = require('./controllers/login')
const Middleware = require('./util/Middleware')
require('express-async-errors')

app.use(morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)].join(' ')
}))
app.use(cors())
app.use(express.json())
app.use('/api/blogs', Middleware.TokenExtractor, BlogRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)
app.use(Middleware.ErrorHandler)

module.exports = app
