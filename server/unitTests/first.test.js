const app = require('../app')
const request = require('supertest')

beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe('First testing', () => {
    test('post get', async () => {
        response = await request(app).get('/user')
        expect(response.statusCode).toEqual(200)
    })
})