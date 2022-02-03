const res = require("express/lib/response");
const carSchema = require("../Models/car");
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
    // messageName: req.body.messageName,
    // templateSrc: "./template " + req.body.templateSrc,
    // title: req.body.title,
    // textFields: req.body.textFields,
    // images: req.body.images,
    // visableTimeInSeconds: parseInt(req.body.visableFor),
    // dateAndTimeToStartFrame: Date(req.body.dateAndTimeToStartFrame),
    // dateAndTimeToEndFrame: Date(req.body.dateAndTimeToEndFrame),
    // daysToshow: req.body.daysToshow,
    // screens: req.body.screens,
  };

  const findCar = carSchema.findOne({
    // messageName: createNewMessage.messageName,
  });
  if (findCar != null) {
    await carSchema.deleteOne({
    //   messageName: createNewMessage.messageName,
    });
  }
  await carSchema.create(createNewCar);
  return res.send(createNewCar);
}

/* PUT */

const updateCar = (req, res) => {
  console.log(req.body);
  let newCar = new carSchema({
    // _id: req.params.id,
    // messageName: req.body.messageName,
    // templateSrc: "./template " + req.body.templateSrc,
    // title: req.body.title,
    // textFields: req.body.textFields,
    // images: req.body.images,
    // visableTimeInSeconds: parseInt(req.body.visableFor),
    // dateAndTimeToStartFrame: Date(req.body.dateAndTimeToStartFrame),
    // dateAndTimeToEndFrame: Date(req.body.dateAndTimeToEndFrame),
    // daysToshow: req.body.daysToshow,
    // screens: req.body.screens,
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
