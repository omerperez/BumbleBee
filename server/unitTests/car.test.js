beforeAll(done => {
    done()
})

afterAll(done => {
    done()
})

describe('Testing car API', () => {
    test('car get', async () => {
        const response = await request(app).get('/car')
        expect(response.statusCode).toEqual(200)
    })
})