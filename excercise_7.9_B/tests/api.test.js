const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }
]

const singleBlog = {
  _id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  __v: 0
}

const singleUser = {
  "username": "M-chan",
  "name": "Michael Chan",
  "password": "1111"
}

let token = null

/* beforeAll(async() => {
  const res = await api.post('/api/users').send(singleUser)
  const loginResponse = await api.post('/api/login').send({
    username: singleUser.username,
    password: singleUser.password})
  token = loginResponse.token
},25000) */

describe('blog http testing', () =>{
  test('get', async() =>{
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(blogs.length)
  },25000)

  test('create_and_login', async () => {
    const res = await api.post('/api/users').send(singleUser)
    const loginResponse = await api.post('/api/login').send({
      username: singleUser.username,
      password: singleUser.password})
    token = loginResponse.token
  },25000)

  test('property id', async() =>{
      const blogList = await Blog.find({})
      expect(blogList[0].id).toBeDefined()
  },25000)

  test('post_blog', async() =>{
    const loginResponse = await api.post('/api/login').send({
      username: singleUser.username,
      password: singleUser.password})
    token = loginResponse.body.token
    console.log(token)
    const response = await api.post('/api/blogs').send(singleBlog).set({authorization: `bearer ${token}`})
    expect(response.status).toEqual(201)
  },25000)

  test('post_invalid_token', async() =>{
    const response = await api.post('/api/blogs').send(singleBlog).set({authorization: `bearer token`})
    expect(response.status).toEqual(400)
  },25000)
  
  test('default likes', async() =>{
      await api.post('/api/blogs').send(singleBlog)
      const response = await api.get('/api/blogs')
      const blogRes = response.body.find(b => b.title === 'Type wars')
      expect(blogRes.likes).toEqual(0)
  },25000)

  test('invalid blogs', async() =>{
      const testBlog = singleBlog
      delete testBlog.title
      delete testBlog.url
      const response = await api.post('/api/blogs').send(testBlog)
      expect(response.status).toEqual(400)
  },25000)

  test('delete blog', async() =>{
      const list = await api.get('/api/blogs')
      const targetId = list.body.find(b => b.title = singleBlog.title).id
      await api.delete(`/api/blogs/${targetId}`).set({authorization: token})
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(blogs.length-1)
  },25000)

  test('update blogs', async() =>{
      const updatedEntry = {...blogs[0], likes: 150}
      updatedEntry.likes = 150
      const response = await api.put(`/api/blogs/${updatedEntry._id.toString()}`).send(updatedEntry)
      expect(response.body.likes).toEqual(150)
  },25000)
})

afterAll(() => {
    mongoose.connection.close()
  })
  