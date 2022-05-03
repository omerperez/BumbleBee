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

const getCarById = async (req, res) => {
  const carId = req.params.id;
  let car = await carSchema.findById(carId);
  try {
    car.clicksCount = car.clicksCount + 1;
    await car.save();
    res.json(car);
    console.log("OK");
  } catch(err) {
    console.log(err);
  }
};

const getMyCars = (req, res) => {
  const userId = req.params.id;

  carSchema.find({dealer: userId}).then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch (err) {
      console.log(err);
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

function getCars(){
const a = new carSchema({
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
  dealer: "6269a796ce8ed2c913d2616c",
});

const b = new carSchema({
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
  dealer: "6269b983ce8ed2c913d261ea",
});

  const c = new carSchema({
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
    dealer: "6269a796ce8ed2c913d2616c",
  });

  const d = new carSchema({
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
      "1647789758670$_86 (44).jpg",
      "1647789819132$_86 (45).jpg",
      "1647789968244$_86 (46).jpg",
      "1647789546060$_86 (47).jpg",
    ],
    mainImage: "1647789160136$_86 (43).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 7,
    doorCount: 5,
    gearbox: "Parallel",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-03-20T15:12:41.000+00:00"),
    colour: "Silver",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "6269baffce8ed2c913d26232",
  });

  const e = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "Porsche",
    companyHebrew: "פורשה",
    model: "CARRERA     992120",
    year: 2020,
    category: "Convertible",
    numberOfVehicleOwners: "3996",
    engine: "3000",
    km: 20000,
    price: 24000,
    netPrice: 16800,
    images: [
      "1647790012975$_86 (58).jpg",
      "1647790263039$_86 (59).jpg",
      "1647790371842$_86 (60).jpg",
      "1647789683449$_86 (61).jpg",
    ],
    mainImage: "1647789444885$_86 (57).jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 2,
    doorCount: 2,
    gearbox: "Right Angle",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-03-20T15:17:25.000+00:00"),
    colour: "Gray",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "6269b983ce8ed2c913d261ea",
  });

  const f = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "BMW",
    companyHebrew: "ב מ וו",
    model: "AEOC",
    year: 2022,
    category: "Station",
    numberOfVehicleOwners: "01",
    engine: "4400",
    km: 10000,
    price: 36000,
    netPrice: 29000,
    images: [
      "1650914479008dc0cdd81-9bee-4b6d-88a0-458aacd3f046.jpg",
      "1650914623534dee1e7f6-2c67-4e4a-aaf2-f7685bc188c8.jpg",
      "1650914768267fa0a65a8-71e2-4a85-8ed7-9282c79b9518.jpg",
    ],
    mainImage: "16509140629820cfa5188-cfe7-456d-9011-aa87344286bc.jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 5,
    doorCount: 5,
    gearbox: "Right Angle",
    emissionClass: "Euro6",
    firstRegistration: Date("2022-11-20T15:17:25.000+00:00"),
    colour: "Black",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "6269b9f8ce8ed2c913d2621a",
  });

  const g = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "Audi  ",
    companyHebrew: "אאודי",
    model: "4MNRV2",
    year: 2021,
    category: "Convertible",
    numberOfVehicleOwners: "00",
    engine: "3996",
    km: 8000,
    price: 40000,
    netPrice: 26000,
    images: [
      "16509145565128c8e2619-1ed8-4556-ba6c-cf5157d2978b.jpg",
      "165091452790383dfe925-0708-4a36-8af8-d593fcd8a51f.jpg",
      "165091427874993fd32c2-b84b-46e0-a429-f1b657d3d8d7.jpg",
      "165091477418767741e91-93fe-478d-b933-ce7f2216f80a.jpg",
    ],
    mainImage: "16509139407260c652844-a384-4914-a30a-74ad94d7c105.jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 4,
    doorCount: 2,
    gearbox: "Right Angle",
    emissionClass: "Euro6",
    firstRegistration: Date("2021-07-20T15:17:25.000+00:00"),
    colour: "Black",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "6269b9f8ce8ed2c913d2621a",
  });

  const h = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    companyEnglish: "Audi",
    companyHebrew: "אאודי",
    model: "FYTC9Y",
    year: 2021,
    category: "Crossover",
    numberOfVehicleOwners: "00",
    engine: "4395",
    km: 5000,
    price: 50000,
    netPrice: 38000,
    images: [
      "16509148944095fab968a-342b-40eb-b365-af0c7592099e.jpg",
      "165091522526100724aee-8665-41d3-a48f-437949dccfc8.jpg",
      "1650915032944b857247f-4dc9-4062-93a3-14df52765e4d.jpg",
      "1650914448729bc312c2f-1e4f-49ed-8f40-aba2a4bf3f78.jpg",
    ],
    mainImage: "16509143377847bc6614b-7ca9-4556-91ac-ce6dd69aaf0c.jpg",
    fuelConsumption: "בנזין",
    numberOfSeats: 5,
    doorCount: 5,
    gearbox: "Right Angle",
    emissionClass: "Euro6",
    firstRegistration: Date("2021-03-20T15:17:25.000+00:00"),
    colour: "Black",
    interiorDesign: "Leather",
    dateOfCreate: Date.now(),
    saleStatus: false,
    isSell: false,
    clicksCount: 0,
    dealer: "6269ba7dce8ed2c913d26226",
  });

return  cars = [a, b, c, d, e, f, g, h];
}
const script = async () => {
  return omer(getCars());
}

async function omer(a) {
  console.log("start");  
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
    console.log("end");
  return "Omer";
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
  script,
};
