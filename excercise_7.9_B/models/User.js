const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const path = require('path')
const Blog = require('./Blog')
require('dotenv').config()

const mongodb_uri = process.env.MONGODB_URI

const userSchema = new mongoose.Schema({
    'username': {type: String,
        minlength: 3,
        required: true},
    'name': {type: String,
        minlength: 3,
        required: true},
    'blogs': [{type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'}],
    'password': {type: String}
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
	}
})
userSchema.plugin(uniqueValidator)

mongoose.connect(mongodb_uri)

module.exports = mongoose.model('User', userSchema)