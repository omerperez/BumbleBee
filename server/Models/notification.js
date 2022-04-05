const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: "cars" },
  client: { type: Schema.Types.ObjectId, ref: "users" },
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
  carLicenseFile : String,
  firstStep: Boolean,
  secondStep: Boolean, 
  ThirdStep: Boolean,
  dateOfCreated: Date,
  dateOfResponse: Date, 
  showCarStatuse: Boolean
});

module.exports = new mongoose.model("Notification", notificationSchema);
