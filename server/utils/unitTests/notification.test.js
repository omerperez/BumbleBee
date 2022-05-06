const app = require('../../server')
const request = require('supertest')
const mongoose = require('mongoose')

beforeAll(done => {
    done()
})

afterAll(done => {
    mongoose.connection.close()
    done()
})

describe('Testing notification API', () => {
    test('notification get', async () => {
        const response = await request(app).get('/notification')
        expect(response.statusCode).toEqual(200)
    })
})