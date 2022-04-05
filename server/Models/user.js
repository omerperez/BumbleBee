const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  image: String,
  role: Number,
  country: String,
  city: String,
  street: String,
  company: String,
  rating: String,
  countRating: String,
  openingTime: String,
  closingTime: String,
  activityDays: String,
  cars: [{ type: Schema.Types.ObjectId, ref: "cars" }],
});

module.exports = new mongoose.model("User", userSchema);
