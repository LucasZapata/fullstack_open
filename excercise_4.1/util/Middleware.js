const logger = require('./logger')
const jwt = require('jsonwebtoken')

const ErrorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })}
    else if (error.name === 'ValidationError'){
        return response.status(400).json({ name: error.name, message: error.message })}
    else if (error.name === 'JsonWebTokenError'){
        return response.status(400).json({ name: error.name, message: error.message })}
    next(error)
}

const TokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    const token = (authorization && authorization.toLowerCase().startsWith('bearer')) ?
        authorization.substring(7) :
        null
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log("aaa", request.token)
    if (!token || !decodedToken.id){
        return response.status(401).json({error : 'invalid or missing token'})
    }
    request['token'] = decodedToken
    next()
}

module.exports = {
    ErrorHandler,
    TokenExtractor
}