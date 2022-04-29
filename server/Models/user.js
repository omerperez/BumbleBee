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
  website: String,
  countRating: String,
  activityDays: String,
  dateOfCreate: Date,
  dateOfBuyCar: Date,
  isSendReq: Boolean,
  activityDaysTime: [{ start: String, end: String }],
  usersRate: [{ type: Schema.Types.ObjectId, ref: "users" }],
  cars: [{ type: Schema.Types.ObjectId, ref: "cars" }],
});

module.exports = new mongoose.model("User", userSchema);
