const _ = require('lodash')

const dummy = (blogs) => {
	return 1 
}

function TotalLikes (blogs) {
	const reducer = (r,n) => r+n.likes
	return blogs.reduce(reducer, 0)
}

function FavoriteBlog (blogs) {
	let favorite = blogs[0]
	blogs.forEach(blog => {
		if (blog.likes > favorite.likes){
			favorite = blog
		}})
	return favorite
}

function MostBlogs (blogs) {
	const authors = _.countBy(blogs, 'author')
	let result = ''
	let n = 0
	_.forEach(authors, (num, author) => {
		if (num > n) {
			n = num
			result = author
		}
	})
	return result 
}

function MostLiked (blogs) {
	let authors = {}
	let author = ''
	let likes = 0
	blogs.forEach((blog) => {
		authors[blog.author] = blog.author in authors ? authors[blog.author] + blog.likes : blog.likes 
	})
	console.log(authors)
	_.forEach(authors, (n, a) =>
		{
		if (n > likes){
			likes = n
			author = a
	}})
	return author
}

module.exports = {
	dummy, TotalLikes, FavoriteBlog, MostBlogs, MostLiked
}

  