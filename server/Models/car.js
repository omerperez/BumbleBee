const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  company: String,
  model: String,
  year: Number,
  numberOfVehicleOwners: String,
  engine: String,
  km: Number,
  price: Number,
  netPrice: Number,
  vehicleStatus: String,
  category: String,
  availability: Boolean,
  description: String,
  images: [String],
  hp: Number,
  fuelConsumption: String,
  numberOfSeats: Number,
  doorCount: Number,
  gearbox: String,
  emissionClass: String,
  firstRegistration: Date,
  mnufacturerColour: String,
  colour: String,
  iteriorDesign: String,
  dealer: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = new mongoose.model("Car", carSchema);
