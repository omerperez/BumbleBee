const carSchema = require("../Models/car");
const userSchema = require("../Models/user");
const notificationSchema = require("../Models/notification");
const mongoose = require("mongoose");
const others = require("./other.js");

const getAllCars = async (req, res) => {
  const cars = await carSchema.find();
  try {
    res.json(cars);
    console.log("Send all cars");
  } catch (err){
    console.log(err);
  }
}

const getCarById = async (req, res) => {
  const carId = req.params.id;
  let car = await carSchema.findById(carId);
  try {
    car.clicksCount = car.clicksCount + 1;
    await car.save();
    res.json(car);
    console.log("Send specific car");
  } catch(err) {
    console.log(err);
  }
};

const getCarsByUser = async (req, res) => {
  const userId = req.params.id;
  const currentUser = await userSchema.findById(userId);
  try {
    if(currentUser.role === 2){
      const dealerCars = await carSchema.find({ dealer: userId });
      res.json(dealerCars)
    } else {
      const allCars = await carSchema.find({ isSell: false });
      res.json(allCars.filter((car) => currentUser.cars.includes(car._id)));
      console.log("send all cars of specific user");
    }
  } catch {
    console.log("Error");
  }
};

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
    inProcess: false,
    isSell: false,
    dealer: req.body.dealer,
  });

  let updateDealer = await userSchema.findById(req.body.dealer);
  if (updateDealer.role !== 2) {
    return res.status(400).json({
      message: "Access blocked - you are not a delaer user",
    });
  }

  try {
    const newCar = await carSchema.create(createNewCar);
    const carList = await updateDealer.cars;
    carList.push(newCar._id);
    updateDealer.cars = carList;
    await updateDealer.save();
    console.log("Create new car success");
    return res.send(newCar._id);
  } catch (err) {
    res.status(400).json({
      message: "Something happened, please try again",
    });
  }
}

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
    .then((updateCar) => {
      res.json(updateCar)
      console.log("Edit car success");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteCar = async (req, res) => {
  const _id = req.params.id;
  try {
    await userSchema.updateMany({}, { $pull: { cars: req.params.id } });
    await notificationSchema.deleteMany({ car: { $in: _id } });
    carSchema.deleteOne({ _id: _id }).then((results) => {
      console.log("Delete car success");
      return res.json(results);
    });
  } catch (err) {
    res.status(400).json({
      message: "Something happened, please try again",
    });
  }
};

const script = async () => {
  return omer(others.getCars());
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

const carsCategoriesViews = async (req, res) => {
 const cars = await carSchema.find();
 const carCategoryList = [0,0,0,0,0,0,0,0,0];
 try {
    for (const car of cars) {
      carCategoryList[others.categoryLocation(car.category)] += car.clicksCount;
    }
    const obj = {
      Sport: carCategoryList[0],
      Sedan: carCategoryList[1],
      Coupe: carCategoryList[2],
      Station: carCategoryList[3],
      Hatchback: carCategoryList[4],
      Convertible: carCategoryList[5],
      SUV: carCategoryList[6],
      Crossover: carCategoryList[7],
      Electric: carCategoryList[8],
    };
    console.log("Graph by category data send");
    res.send(obj);
  } catch (err) {
    console.log("fail");
    res.status(400).json(err.message);
  }
};

module.exports = {
  deleteCar,
  updateCar,
  createCar,
  getCarById,
  getAllCars,
  getCarsByUser,
  script,
  carsCategoriesViews,
};
