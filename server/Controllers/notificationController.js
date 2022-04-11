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
  const notificationFromJason = JSON.parse(req.body.notification);
  const createNewNotification = new notificationSchema({
    _id: new mongoose.Types.ObjectId(),
    car: req.body.car,
    client: req.body.client,
    dealer: req.body.dealer,
    carLicenseFile : String,
    firstStep: true,
    secondStep: false, 
    ThirdStep: false,
    dateOfCreated: Date.now(),
    dateOfResponse: Date, 
    showCarStatuse: false
  })

  const newNotification = await notificationSchema.create(createNewNotification);
}

/* EXPORTS */
module.exports = {
 getAllNotification,
 getNotificationsByUserId,
 createNotification
};
