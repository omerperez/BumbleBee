const app = require('../server')
const request = require('supertest')
const { response } = require('../server')
const userEmail = 'osdn@adnf.com'
const userPassword = '123123'
const mongoose = require('mongoose')

beforeAll(done => {
    done()
})

afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('Testing user API', () => {
    test('user get', async () => {
        const response = await request(app).get('/user')
        expect(response.statusCode).toEqual(200)
    })
    
    test('login user', async () => {
        const response = await request(app).post('/user/login').send({
            'email' : userEmail,
            'password' : userPassword
        })
        expect(response.statusCode).toEqual(200)
        const User = response.body.user
        expect(User.email).toEqual(userEmail)
    })
})