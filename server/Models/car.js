const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  companyEnglish: String,
  companyHebrew: String,
  model: String,
  year: Number,
  numberOfVehicleOwners: String,
  engine: String,
  km: Number,
  price: Number,
  netPrice: Number,
  // description: String,
  dateForImages : Date,
  images: [String],
  fuelConsumption: String,
  numberOfSeats: Number,
  doorCount: Number,
  gearbox: String,
  emissionClass: String,
  firstRegistration: Date,
  colour: String,
  iteriorDesign: String,
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = new mongoose.model("Car", carSchema);
