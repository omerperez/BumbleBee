const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
// const carSchema = require("../Models/car");
// const NewCar = new carSchema({
//     _id: new mongoose.Types.ObjectId(),
//     companyEnglish: "bmw",
//     companyHebrew: "במוו",
//     model: "m2",
//     year: "2020",
//     numberOfVehicleOwners: "0",
//     engine: "3000",
//     km: "1500",
//     price: "50000",
//     netPrice: "30000",
//     dateForImages: "1.5.2020",
//     images: req.body.imagesName,
//     mainImage: req.body.mainName,
//     fuelConsumption: carFromJason.fuel,
//     numberOfSeats: carFromJason.numberOfSeats,
//     doorCount: carFromJason.doorCount,
//     gearbox: carFromJason.gearbox,
//     emissionClass: "Euro6",
//     firstRegistration: Date(carFromJason.firstRegistrationDate),
//     colour: carFromJason.colour,
//     condition: carFromJason.condition,
//     iteriorDesign: carFromJason.interiorDesign,
//     dateOfCreate: Date,
//     saleStatus: Boolean,
//     dealer: req.body.dealer,
//   });

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

    // test('add new car', async () => {
    //     const response = await request(app).post('/user/create').send({
    //         NewCar
    //     })
    //     expect(response.statusCode).toEqual(200)
    //     const newCar = response.body.newCar
    //     expect(newCar.model).toEqual(NewCar.model)
    // })
})