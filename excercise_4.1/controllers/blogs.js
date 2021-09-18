const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')
const USer = require('../models/User')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

BlogRouter.get('/', async(request, response, next) => {
	const result = await Blog.find({}).populate('user')
	response.json(result.map(b => b.toJSON()))
})

BlogRouter.post('/', async(request, response, next) => {
	console.log(request.token)
	const userId = await User.findById(request.token.id)
	console.log(request.token)
	if (!userId){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const newBlog = new Blog({
		title: request.body.title,
		author: request.body.author,
		user: userId,
		url: request.body.url
	})
	console.log('3')
	const result = await newBlog.save()
	return response.status(201).json(result)
})

BlogRouter.delete('/:id', async(request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const targetBlog = Blog.findById(request.params.id)
	if (!targetBlog.user.toString() === decodedToken){
		return response.status(401).json({error : 'user not authorized'})
	}
	await Blog.findByIdAndDelete(request.params.id)
	return response.status(204).end()
})

BlogRouter.put('/:id', async(request, response, next) => {
	const updatedEntry = new Blog(request.body)
	console.log(request.params.id, "aaaaaaaa", updatedEntry)
	const changes = await Blog.findByIdAndUpdate(request.params.id, updatedEntry, {new:true})
	response.json(changes.toJSON())
})

module.exports = BlogRouter