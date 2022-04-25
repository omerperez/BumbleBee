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

const addClick = async (req, res) => {
  const carId = req.body._id;
  const updateClicks = new carSchema({
    _id: req.body._id,
    clicksCount: 1,
  });
  try {
    const carToShow = await carSchema
      .findOneAndUpdate(carId, updateClicks, { new: true })
      .then((updateCar) => console.log(updateCar))
      .catch((err) => console.log(err));
    res.json(carToShow);
    console.log("OK");
  } catch {
    console.log("Error");
  }
};

const getCarById = async (req, res) => {
  const carId = req.params.id;
  const car = await carSchema.findById(carId);
  try {
    res.json(car);
    console.log("OK");
  } catch {
    console.log("Error");
  }
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
  const companyNameFormat = carFromJason.company.english.charAt(0).toUpperCase() + carFromJason.company.english.slice(1);
  const createNewCar = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: companyNameFormat,
    clicksCount: 0,
    companyHebrew: carFromJason.company.hebrew,
    model: carFromJason.model,
    year: carFromJason.year,
    category: carFromJason.category,
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
    firstRegistration: new Date(carFromJason.firstRegistrationDate),
    colour: carFromJason.colour,
    condition: carFromJason.condition,
    iteriorDesign: carFromJason.interiorDesign,
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    dealer: req.body.dealer,
  });

  let updateDealer = await userSchema.findById(req.body.dealer);
  if (updateDealer.role !== 2) {
    return res.status(400).json({
      message: "Access blocked - you are not an administrator user",
    });
  }
  const newCar = await carSchema.create(createNewCar);

  const filter = { _id: updateDealer._id };
  const carList = await updateDealer.cars;
  carList.push(newCar._id);
  const update = new userSchema({
    _id: updateDealer._id,
    cars: carList,
  });
  await userSchema.findOneAndUpdate(filter, update, { new: true });
  return res.send(newCar._id);
}

/* PUT */
const updateCar = async (req, res) => { 

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


var a = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "BMW",
    companyHebrew: "ב מ וו",
    model: "M4",
    year: 2020,
    category: "Sport",
    numberOfVehicleOwners: "01",
    engine: "2979",
    km: 2000,
    price: 100000,
    netPrice: 70000,
    images: [
      "1647790248800$_86 (19).jpg",
      "1647790428289$_86 (26).jpg",
      "1647790411733$_86 (27).jpg",
      "1647790500504$_86 (28).jpg",
    ],
    mainImage: "1647789564457$_86 (25).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 4,
    doorCount: 2,
    gearbox: "Right Angle",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-03-20T15:19:26.000+00:00"),
    colour: "Gray",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "623745aec234f317bd262da7",
  });

var b =   new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "BMW",
    companyHebrew: "ב מ וו",
    model: "M240I",
    year: 2020,
    category: "Sport",
    numberOfVehicleOwners: "01",
    engine: "2998",
    km: 10000,
    price: 90000,
    netPrice: 63000,
    images: [
      "1647790039326$_86 (21).jpg",
      "1647789712059$_86 (22).jpg",
      "1647789460873$_86 (23).jpg",
      "1647789492689$_86 (24).jpg",
    ],
    mainImage: "1647789055255$_86 (20).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 4,
    doorCount: 2,
    gearbox: "Shaft Mount",
    emissionClass: "Euro6",
    firstRegistration: Date("2021-03-20T15:19:26.000+00:00"),
    colour: "Blue",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "623745aec234f317bd262da7",
  });

  var c = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "Audi",
    companyHebrew: "אאודי",
    model: "T.T- ROADSTER",
    year: 2020,
    category: "Sport",
    numberOfVehicleOwners: "00",
    engine: "1984",
    km: 8000,
    price: 110000,
    netPrice: 77000,
    images: [
      "1647789456935$_86 (53).jpg",
      "1647789478232$_86 (54).jpg",
      "1647790120500$_86 (55).jpg",
      "1647789359950$_86 (56).jpg",
    ],
    mainImage: "1647789293103$_86 (52).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 2,
    doorCount: 2,
    gearbox: "Parallel",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-03-20T15:14:55.000+00:00"),
    colour: "Orange",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "62374422c234f317bd262d7c",
  });

  var c = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "Audi",
    companyHebrew: "אאודי",
    model: "SQ7 ZZZ",
    year: 2022,
    category: "Crossover",
    numberOfVehicleOwners: "3996",
    engine: "1984",
    km: 300,
    price: 180000,
    netPrice: 126000,
    images: [
      "1647789456935$_86 (53).jpg",
      "1647789478232$_86 (54).jpg",
      "1647790120500$_86 (55).jpg",
      "1647789359950$_86 (56).jpg",
    ],
    mainImage: "1647789293103$_86 (52).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 2,
    doorCount: 2,
    gearbox: "Parallel",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-03-20T15:14:55.000+00:00"),
    colour: "Orange",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "62374422c234f317bd262d7c",
  });

var cars = [a,b,c];

const script = async () => {
  return omer(cars);
}


async function omer(a) {
  a.forEach(async (car) => {
    let updateDealer = await userSchema.findById(car.dealer);
    const newCar = await carSchema.create(car);

    const filter = { _id: updateDealer._id };
    const carList = await updateDealer.cars;
    carList.push(newCar._id);
    const update = new userSchema({
      _id: updateDealer._id,
      cars: carList,
    });
    await userSchema.findOneAndUpdate(filter, update, { new: true });
  });
  
  // return res.send("Omer");
}

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
  addClick,
  script
};
