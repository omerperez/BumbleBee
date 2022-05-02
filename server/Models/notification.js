const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  car: { type: Schema.Types.ObjectId, ref: "cars" },
  client: { type: Schema.Types.ObjectId, ref: "users" },
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
  isCancelRequest: Boolean,
  isRead: Boolean,
  lastUpdateDate: Date,
  dateOfCreated: Date,
  step: Number,
  markAsRead: Boolean,
  paymentFiles: [String],
  carLicenseFile: [String],
  govIlFile: [String],
  dhlFile: [String],
  govIlRef: String,
  dhlRef: String,
  containerNumber: String,
  containerFiles: [String],
  dateOfDealerResponse: Date,
  dateOfAttachFiles: Date,
  dateOfContainerNumber: Date,
});

module.exports = new mongoose.model("Notification", notificationSchema);
