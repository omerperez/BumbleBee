const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')

beforeAll(done => {
    done()
})

afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('Testing car API', () => {
    test('car get', async () => {
        const response = await request(app).get('/car')
        expect(response.statusCode).toEqual(200)
    })
})