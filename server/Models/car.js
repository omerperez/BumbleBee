const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  image: String,
  role: Number,
});

module.exports = new mongoose.model("Car", carSchema);
