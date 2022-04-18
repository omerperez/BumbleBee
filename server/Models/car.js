const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  companyEnglish: String,
  companyHebrew: String,
  model: String,
  year: String,
  numberOfVehicleOwners: String,
  engine: String,
  km: Number,
  price: Number,
  netPrice: Number,
  dateForImages: Date,
  images: [String],
  mainImage: String,
  fuelConsumption: String,
  numberOfSeats: Number,
  doorCount: Number,
  gearbox: String,
  emissionClass: String,
  firstRegistration: Date,
  colour: String,
  iteriorDesign: String,
  dateOfCreate: Date,
  saleStatus: Boolean,
  isSell: Boolean,
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = new mongoose.model("Vehicles", carSchema);
