const carSchema = require("../Models/car");
const userSchema = require("../Models/user");
const mongoose = require("mongoose");

/* GET */
const getAllCars = (req, res) => {
  carSchema.find().then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getCarById = (req, res) => {
  const carId = req.params.id;
  carSchema.findById(carId).then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getMyCars = (req, res) => {
  const userId = req.params.id;
  console.log(req.params.id);
  carSchema.find().then((results) => {
    try {
      res.json(results.filter(car => car.dealer == userId));
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });     
};

const getFavoriteCars = async (req, res) => {
  const userId = req.params.id;

  const currentUser = await userSchema.findById(userId);

  console.log(req.params.id);
  carSchema.find().then((results) => {
    try {
      res.json(
        results.filter((car) => currentUser.cars.includes(car._id))
      );
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getCarByCompany = (request, respons) => {
  carSchema.find({ company: req.params.company }).then((results) => {
    try {
      respons.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

/* POST */
async function createCar(req, res) {

  const carFromJason = JSON.parse(req.body.car);
  const createNewCar = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: carFromJason.company.english,
    companyHebrew: carFromJason.company.hebrew,
    model: carFromJason.model,
    year: carFromJason.year,
    numberOfVehicleOwners: carFromJason.numberOfVehicleOwners,
    engine: carFromJason.engine,
    km: carFromJason.km,
    price: carFromJason.price,
    netPrice: carFromJason.netPrice,
    dateForImages: req.body.dateForImages,
    images: req.body.imagesName,
    mainImage: req.body.mainName,
    fuelConsumption: carFromJason.fuel,
    numberOfSeats: carFromJason.numberOfSeats,
    doorCount: carFromJason.doorCount,
    gearbox: carFromJason.gearbox,
    emissionClass: "Euro6",
    firstRegistration: Date(carFromJason.firstRegistrationDate),
    colour: carFromJason.colour,
    condition: carFromJason.condition,
    iteriorDesign: carFromJason.interiorDesign,
    dateOfCreate: Date,
    saleStatus: Boolean,
    dealer: req.body.dealer,
  });

  let updateDealer = await userSchema.findById(req.body.dealer);
  if(updateDealer.role !== 2){
    return res.status(400).json({
      message: "Access blocked - you are not an administrator user",
    });
  }
  const newCar = await carSchema.create(createNewCar);

  const filter = { _id: updateDealer._id };
  const carList = await updateDealer.cars;
  carList.push(newCar._id);
  const update = new userSchema({
    _id : updateDealer._id,
    cars : carList,
  });
  await userSchema.findOneAndUpdate(filter, update, { new : true });
  return res.send(newCar._id);
}

/* PUT */
const updateCar = async (req, res) => { 
  console.log(req.body.dealer);
  const carId = { _id: req.body._id};
  const car = await carSchema.findById(carId);

  if (car.dealer.valueOf() != req.body.dealer) {
    return res.status(400).json({
      message: "Access blocked - you are not owner on this car",
    });
  }
  const newCarProperties = new carSchema({
    _id: req.body._id,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.price * 0.7,
    colour: req.body.colour,
    images: car.images,
  });
  
  carSchema
    .findOneAndUpdate(carId, newCarProperties, { new: true })
    .then((updateCar) => res.json(updateCar))
    .catch((err) => res.status(400).json("Error: " + err));
};

/* DELETE */
const deleteCar = (req, res) => {
  const _id = req.params.id;
  const user = carSchema.deleteOne({ _id: _id }).then((results) => {
   return res.json(results); 
  });
};

/* EXPORTS */
module.exports = {
  deleteCar,
  updateCar,
  createCar,
  getCarByCompany,
  getCarById,
  getMyCars,
  getAllCars,
  getFavoriteCars,
};
