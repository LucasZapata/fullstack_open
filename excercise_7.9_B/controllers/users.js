const UserRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const Bcrypt = require('bcrypt')
const { result } = require('lodash')

UserRouter.get('/', async(request, response, next) => {
    const result = await User.find({}).populate('blogs')
    return response.json(result.map(b => b.toJSON()))
})

UserRouter.get('/list', async(request, response, next) => {
    const result = await User.find({}).populate('blogs')
    return response.json(result.map(b => ({id:b._id.toString(), name:b.name, blogs:b.blogs})))
})

UserRouter.post('/', async(request, response, next) => {
    const saltRounds = 10
    const body = request.body
    if ((await User.find({username: body.username})).length > 0){
        response.statusMessage = 'Username in use'
        return response.status(401).end()
    }
    if ((await User.find({name: body.name})).length > 0){
        response.statusMessage = 'Name in use'
        return response.status(401).end()
    }
    if (body.password.length < 3){
        response.statusMessage = `Password is invalid ${body.password} ${body.password.length}`
        return response.status(401).end()
    }
    const passwordHash = await Bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
        'username': body.username,
        'name': body.name,
        'password': passwordHash
    })
    const result = await newUser.save()
    return response.status(201).json(result)
})

module.exports = UserRouter