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
    else {return response.status(400).json({ name: error.name, message: error.message })}
    next(error)
}

const TokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization){return next()}
    const token = (authorization && authorization.toLowerCase().startsWith('bearer')) ?
        authorization.substring(7) :
        null
    console.log(token)
    if (!token){return next()}
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id){
        return response.status(401).json({error : 'invalid or missing token'})
    }
    request['token'] = decodedToken
    next()
}

module.exports = {
    ErrorHandler,
    TokenExtractor
}