const res = require("express/lib/response");
const { isValidObjectId } = require("mongoose");
const carSchema = require("../Models/car");
const user = require("../Models/user");
const userController = require("./userController");

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
  console.log(req.params);
  carSchema.findById(carId).then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getCarByCompany = (request, respons) => {
  carSchema
    .find({ company: req.params.company })
    .then((results) => {
      try {
        respons.json(results);
        console.log("OK");
      } catch {
        console.log("Error");
      }
    });
};

/* POST */
async function createCar (req, res) {
  console.log(req.body);
  const createNewCar = {
    // _id: req.params.id,
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
    // description: req.body.description,
    images: req.body.images,
    fuelConsumption: req.body.fuelConsumption,
    numberOfSeats: req.body.numberOfSeats,
    doorCount: req.body.doorCount,
    gearbox: req.body.gearbox,
    emissionClass: req.body.emissionClass,
    firstRegistration: Date(req.body.firstRegistration),
    colour: req.body.colour,
    condition: req.body.condition,
    iteriorDesign: req.body.iteriorDesign,
    dealer: ObjectId(req.body.dealerId),
  };

  /* Next Step - One to Many */
  // if(user.)
    // await userSchema.findOneAndUpdate(
    //   { id: createNewCar.dealer },
    //   { $push: { cars: createNewCar._id } }
    // );

  await carSchema.create(createNewCar);
  return res.send(createNewCar);
}

/* PUT */
const updateCar = (req, res) => {
  console.log(req.body);
  let newCar = new carSchema({
    _id: req.params.id,
    companyEnglish: req.body.companyEnglish,
    companyHebrew: req.body.companyHebrew,
    model: req.body.model,
    year: req.body.year,
    numberOfVehicleOwners: req.body.numberOfVehicleOwners,
    engine: req.body.engine,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.netPrice,
    description: req.body.description,
    images: req.files,
    fuelConsumption: req.body.fuelConsumption,
    numberOfSeats: req.body.numberOfSeats,
    doorCount: req.body.doorCount,
    gearbox: req.body.gearbox,
    emissionClass: req.body.emissionClass,
    firstRegistration: Date(req.body.firstRegistration),
    colour: req.body.colour,
    condition: req.body.condition,
    iteriorDesign: req.body.iteriorDesign,
    dealer: req.body.dealerId,
  });

    carSchema
      .findOneAndUpdate({ _id: newCar._id }, newCar, { new: true })
      .then((updateCar) => res.json(updateCar))
      .catch((err) => res.status(400).json("Error: " + err));
};

/* DELETE */
const deleteCar = (req, res) => {
  console.log(req.params.id);
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
  getAllCars,
};