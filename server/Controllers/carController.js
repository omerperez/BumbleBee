const res = require("express/lib/response");
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
  const messageId = req.params.id;
  console.log(req.params);
  carSchema.findById(messageId).then((results) => {
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
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    numberOfVehicleOwners: req.body.numberOfVehicleOwners,
    engine: req.body.engine,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.netPrice,
    vehicleStatus: req.body.vehicleStatus,
    category: req.body.category,
    availability: req.body.availability,
    description: req.body.description,
    images: req.body.images,
    hp: req.body.hp,
    fuelConsumption: req.body.fuelConsumption,
    numberOfSeats: req.body.numberOfSeats,
    doorCount: req.body.doorCount,
    gearbox: req.body.gearbox,
    emissionClass: req.body.emissionClass,
    firstRegistration: Date(req.body.firstRegistration),
    mnufacturerColour: req.body.mnufacturerColour,
    colour: req.body.colour,
    iteriorDesign: req.body.iteriorDesign,
    dealer: req.body.dealerId,
  };
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
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    numberOfVehicleOwners: req.body.numberOfVehicleOwners,
    engine: req.body.engine,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.netPrice,
    vehicleStatus: req.body.vehicleStatus,
    category: req.body.category,
    availability: req.body.availability,
    description: req.body.description,
    images: req.body.images,
    hp: req.body.hp,
    fuelConsumption: req.body.fuelConsumption,
    numberOfSeats: req.body.numberOfSeats,
    doorCount: req.body.doorCount,
    gearbox: req.body.gearbox,
    emissionClass: req.body.emissionClass,
    firstRegistration: Date(req.body.firstRegistration),
    mnufacturerColour: req.body.mnufacturerColour,
    colour: req.body.colour,
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