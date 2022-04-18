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
  rating: Number,
  ratingCount: Number,
  countRating: String,
  activityDaysTime: [{ start: String, end: String }],
  // closingTime: [{ day: String, time: String }],
  activityDays: String,
  dateOfCreate: Date,
  cars: [{ type: Schema.Types.ObjectId, ref: "cars" }],
});

module.exports = new mongoose.model("User", userSchema);
