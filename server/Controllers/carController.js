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

  const createNewCar = new carSchema({
    _id : new mongoose.Types.ObjectId(),
    companyEnglish: req.body.companyEnglish,
    companyHebrew: req.body.companyHebrew,
    model: req.body.model,
    year: req.body.year,
    numberOfVehicleOwners: req.body.numberOfVehicleOwners,
    engine: req.body.engine,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.netPrice,
    dateForImages: req.body.dateForImages,
    images: req.body.imagesName,
    mainImage: req.body.mainName,
    fuelConsumption: req.body.fuelConsumption,
    numberOfSeats: req.body.numberOfSeats,
    doorCount: req.body.doorCount,
    gearbox: req.body.gearbox,
    emissionClass: req.body.emissionClass,
    firstRegistration: Date(req.body.firstRegistration),
    colour: req.body.colour,
    condition: req.body.condition,
    iteriorDesign: req.body.iteriorDesign,
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
};
