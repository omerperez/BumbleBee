const app = require('../app')
const request = require('supertest')
const { response } = require('../app')
const userEmail = 'osdn@adnf.com'
const userPassword = '123123'

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe('Testing user API', () => {
    test('user get', async () => {
        const response = await request(app).get('/user')
        expect(response.statusCode).toEqual(200)
    })

    // test('add new user', async () => {
    //     const response = await request(app).post('/user/register').send({
    //         'email' : userEmail,
    //         'password' : userPassword
    //     })
    //     expect(response.statusCode).toEqual(200)
    //     const newUser = response.body.newUser
    //     expect(newUser.email).toEqual(userEmail)
    //     expect(newUser.password).toEqual(userPassword)
    // })

    // test('login user', async () => {
    //     const response = await request(app).post('/user/login').send({
    //         'email' : userEmail,
    //         'password' : userPassword
    //     })
    //     expect(response.statusCode).toEqual(200)
    //     const User = response.body
    //     expect(User.email).toEqual(userEmail)
    //     expect(User.password).toEqual(userPassword)
    // })
})