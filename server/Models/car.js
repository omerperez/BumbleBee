const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  companyEnglish: String,
  companyHebrew: String,
  model: String,
  year: String,
  category: String,
  numberOfVehicleOwners: String,
  engine: String,
  km: Number,
  price: Number,
  netPrice: Number,
  images: [String],
  mainImage: String,
  fuelConsumption: String,
  numberOfSeats: Number,
  doorCount: Number,
  gearbox: String,
  emissionClass: String,
  firstRegistration: Date,
  colour: String,
  interiorDesign: String,
  dateOfCreate: Date,
  saleStatus: Boolean,
  isSell: Boolean,
  clicksCount: Number,
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = new mongoose.model("Vehicles", carSchema);
