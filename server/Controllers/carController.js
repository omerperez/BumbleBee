const res = require("express/lib/response");
const carSchema = require("../Models/car");

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
  const createNewCar = {
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
  };

  const newCar = await carSchema.create(createNewCar);
  return res.send(newCar._id);
}

/* PUT */
const updateCar = (req, res) => {
  let newCar = new carSchema({
    _id: req.params.id,
    km: req.body.km,
    price: req.body.price,
    netPrice: req.body.price * 0.7,
    colour: req.body.colour,
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
