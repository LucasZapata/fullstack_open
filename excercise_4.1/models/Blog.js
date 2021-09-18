const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const path = require('path')
require('dotenv').config()

const mongodb_uri = process.env.MONGODB_URI

const blogSchema = new mongoose.Schema({
	'title': { type: String,
        minlength: 3,
        required: true },
	'author': { type: String,
        minlength: 3,
        required: true},
	'user': {type: mongoose.Schema.Types.ObjectId,
		ref: 'User'},
	'url': { type: String,
        minlength: 3,
        required: true },
	'likes': { type: Number,
		required: true,
		default: 0	
	}
})

blogSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
	}
})

mongoose.connect(mongodb_uri)

module.exports = mongoose.model('Blog', blogSchema)