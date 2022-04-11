const notificationSchema = require("../Models/notification");
const carSchema = require("../Models/car");
const userSchema = require("../Models/user");
const mongoose = require("mongoose");

/* GET */
const getAllNotification = (req, res) => {
  notificationSchema.find().then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};

const getNotificationsByUserId = (req, res) => {
    const userId = req.params.id;
    notificationSchema.find().then((results) => {
    try {
      res.json(results.filter((notification) => notification.client == userId));
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
}

/* POST */
async function createNotification(req, res) {
  const newNotification = {
    _id: new mongoose.Types.ObjectId(),
    
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
  }
}

/* EXPORTS */
module.exports = {
 getAllNotification,
 getNotificationsByUserId,
 createNotification
};
