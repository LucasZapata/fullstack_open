const { TestWatcher } = require('@jest/core')
const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const api = supertest(app)

const user = {
    'username':'M-chan',
    'name': 'Michael Chan',
    'password': 'secretword'
}

const bad_user = {
    'username':'Username',
    'name': 'Name Last',
    'password': '2'
}

beforeEach(async() => {
    await User.deleteMany({})
    /* newBlogs = blogs.map(b => new Blog(b))
    reqs = newBlogs.map(r => r.save())
    await Promise.all(reqs) */
},25000)

describe('user http testing', () => {
    test('get user', async() => {
        await api.post('/api/users').send(user)
        const response = await api.get('/api/users')
        console.log(response.body)
        expect(response.body).toHaveLength(1)
    })    
    test('post user', async() => {
        const a = await api.post('/api/users').send(user)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(1)
    })
    test('post bad user', async() => {
        const a = await api.post('/api/users').send(bad_user)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })