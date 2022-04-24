const app = require('../app')
const request = require('supertest')

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe('Testing notification API', () => {
    test('notification get', async () => {
        const response = await request(app).get('/notification')
        expect(response.statusCode).toEqual(200)
    })
})