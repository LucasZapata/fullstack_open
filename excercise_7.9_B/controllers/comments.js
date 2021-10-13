const CommentRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

CommentRouter.post('/:id', async(request, response, next) => {
    if (!request.token){
		return response.status(401).json({error : 'invalid or missing token A'})
	}
	const userId = await User.findById(request.token.id)
	if (!userId){
		return response.status(401).json({error : 'invalid or missing token B'})
	}
    const comment = new Comment({
        content:request.body.content,
        blog:request.params.id
    })
	const result = await comment.save()
	return response.status(201).json(result)
})

CommentRouter.get('/:id', async(request, response, next) => {
	const result = await Comment.find({blog:request.params.id})
	response.json(result.map(b => b.content))
})

module.exports = CommentRouter