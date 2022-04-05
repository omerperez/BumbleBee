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

/* EXPORTS */
module.exports = {
 getAllNotification,
 getNotificationsByUserId
};
