const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const LoginRouter = require('express').Router()
const User = require('../models/User')

LoginRouter.post('/', async (request, response) => {
    const body = request.body
    const userRes = await User.findOne({username: body.username})
    const passwordHash = User === null ? false 
        : await bcrypt.compare(body.password, userRes.password)
    if (!passwordHash){
        return response.status(401).json({error:"invalid username or password"})
    }

    const userData = {
        username: userRes.username,
        id: userRes._id
    }
    const token = jwt.sign(userData, process.env.SECRET)

    response.status(200).send({token, username: userRes.username, name:userRes.name})
})

module.exports = LoginRouter