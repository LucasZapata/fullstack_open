const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

BlogRouter.get('/', async(request, response, next) => {
	const result = await Blog.find({}).populate('user')
	response.json(result.map(b => b.toJSON()))
})

BlogRouter.post('/', async(request, response, next) => {
	if (!request.token){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const userId = await User.findById(request.token.id)
	if (!userId){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const newBlog = new Blog({
		title: request.body.title,
		author: request.body.author,
		user: userId,
		url: request.body.url
	})
	const result = await newBlog.save()
	return response.status(201).json(result)
})

BlogRouter.delete('/:id', async(request, response, next) => {
	if (!request.token){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const userId = await User.findById(request.token.id)
	if (!userId){
		return response.status(401).json({error : 'invalid or missing token'})
	}
	const targetBlog = await Blog.findById(request.params.id)
	if (targetBlog.user._id.toString() !== userId._id.toString()){
		return response.status(401).json({error : 'user not authorized'})
	}
	await Blog.findByIdAndDelete(request.params.id)
	return response.status(202).json({message:'deleted blog'})
})

BlogRouter.put('/:id', async(request, response, next) => {
	const updatedEntry = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes}
	const changes = await Blog.findByIdAndUpdate(request.params.id, updatedEntry, {new:true})
	response.status(202).json(changes.toJSON())
})

module.exports = BlogRouter