const notificationSchema = require("../Models/notification");
const carSchema = require("../Models/car");
const userSchema = require("../Models/user");
const mongoose = require("mongoose");
const {sendEmailNotification} = require("../utils/EmailFunctions");

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

const getNotificationsForClientNavigation = async (req, res) => {
  const userId = req.params.id;
  let notifications = await notificationSchema.find({ client: userId, isRead: false });
  let notificationData = [];

  try {
    for (let alert of notifications.filter(
      (notification) => notification.step % 2 == 0 || notification.step === 5
    )) {
      const dealer = await userSchema.findById(alert.dealer);
      const sender = {
        _id: alert._id,
        senderName: dealer.firstName + " " + dealer.lastName,
        email: dealer.email,
        image: dealer.image,
        step: alert.step,
        isCancelRequest: alert.isCancelRequest,
      };
      notificationData.push(sender);
    }
    await res.json(notificationData);
    console.log("OK");
  } catch (err) {
    console.log(err);
  }
}

const getNotificationsForDealerNavigation = async (req, res) => {
  const userId = req.params.id;
  let notifications = await notificationSchema.find({
    dealer: userId,
    isRead: false,
  });
  let notificationData = [];

  try {
    for (let alert of notifications.filter(
      (notification) => notification.step % 2 !== 0 && notification.step !== 5
    )) {
      const client = await userSchema.findById(alert.client);
      const sender = {
        _id: alert._id,
        senderName: client.firstName + " " + client.lastName,
        email: client.email,
        image: client.image,
        step: alert.step,
        isCancelRequest: alert.isCancelRequest,
      };
      notificationData.push(sender);
    }
    await res.json(notificationData);
    console.log("OK");
  } catch (err) {
    console.log(err);
  }
};

const getNotificationsByClientId = (req, res) => {
  const userId = req.params.id;
  notificationSchema.find({client : userId}).then((results) => {
    try {
      res.json(results);
      console.log("OK");
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  });
};

const getNotificationsByUserId = (req, res) => {
    const userId = req.params.id;
    notificationSchema.find({ dealer : userId }).then((results) => {
      try {
        res.json(results);
        console.log("OK");
      } catch (err){
        res.status(400).json({
          message: err
        });
      }
    });
}

async function createAlert(req, res) {
  const alertFromJason = JSON.parse(req.body.alert);
  const createAlert = new notificationSchema({
    _id: new mongoose.Types.ObjectId(),
    car: alertFromJason.car,
    dealer: alertFromJason.dealer,
    client: alertFromJason.client,
    isCancelRequest: false,
    isRead: false,
    dateOfCreated: Date.now(),
    lastUpdateDate: Date.now(),
    step: 1,
    markAsRead: false,
    paymentFiles: req.body.paymentFiles ?? null,
    carLicenseFile: [],
    govIlFile: [],
    dhlFile: [],
    govIlRef: null,
    dhlRef: null,
    containerNumber: null,
    containerFiles: null,
    dateOfDealerResponse: null,
    dateOfAttachFiles: null,
    dateOfContainerNumber: null,
  });

  let updateUser = await userSchema.findById(createAlert.client);
  if (updateUser.role !== 1) {
    return res.status(400).json({
      message: "Access blocked - you are not an client user",
    });
  }
  
  try {
    let car = await carSchema.findById(alertFromJason.car);
    car.inProcess = true;
    await car.save();
    await notificationSchema.create(createAlert);
    updateUser.isSendReq = true;
    await updateUser.save();
    console.log("Success");
    sendEmailNotification(alertFromJason.client, alertFromJason.dealer, 1);
    res.send("Success");
  } catch (err) {
    res.status(400).json({
      message: "Something happened, please try again",
    });
  }
}

const markAsRead = async (req, res) => {
  const alertId = { _id: req.params.id };
  const alert = await notificationSchema.findById(alertId);
  try {
    alert.isRead = true;
    await alert.save();
    console.log("Success");
    res.send(alert);
  } catch (err) {
    console.log("filed");
    res.status(400).json("Something happened, please try again");
  }
};

const editAlert = async (req, res) => {
  
  const alertFromJason = JSON.parse(req.body.alert);
  const alertId = { _id: req.params.id };
  const alert = await notificationSchema.findById(alertId);

  if (
    (alertFromJason.dealer &&
      alert.dealer.valueOf() != alertFromJason.dealer) ||
    (alertFromJason.client && alert.client.valueOf() != alertFromJason.client)
  ) {
    return res.status(400).json({
      message: "Access blocked - you are not owner on this request",
    });
  }

  if (alertFromJason.isCancelRequest && alertFromJason.isCancelRequest == true){
      let updateUser = await userSchema.findById(alert.client);
      let carToCancelProcess = await carSchema.findById(alert.car);
      updateUser.isSendReq = false;
      carToCancelProcess.inProcess = false;
      await updateUser.save();
      await carToCancelProcess.save();
  } else if (alertFromJason.step == 2) {
    alertFromJason.carLicenseFile = req.body.carLicenseFile;
    alertFromJason.dateOfDealerResponse = Date.now();
    alertFromJason.lastUpdateDate = Date.now();
  }
  else if (alertFromJason.step == 3){
    alertFromJason.govIlFile = req.body.govIlFile;
    alertFromJason.dhlFile = req.body.dhlFile;
    alertFromJason.dateOfAttachFiles = Date.now();
    alertFromJason.lastUpdateDate = Date.now(); 
  } else {
    alertFromJason.containerFiles = req.body.containerFiles;
    alertFromJason.lastUpdateDate = Date.now();

    let currentCar = await carSchema.findById(alertFromJason.car);
    currentCar.isSell = true;
    await currentCar.save();
  }
  
  try {
    const updateAlert = await notificationSchema.findOneAndUpdate(alertId, alertFromJason, { new: true });
    updateAlert.isRead = false;
    await updateAlert.save();
    console.log("Success");
    sendEmailNotification(alert.client, alert.dealer, alertFromJason.step);
    res.send("Success");
  } catch (err) {
    console.log("filed");
    res.status(400).json("Something happened, please try again");
  }
};

module.exports = {
  getAllNotification,
  getNotificationsByUserId,
  createAlert,
  editAlert,
  getNotificationsByClientId,
  getNotificationsForClientNavigation,
  getNotificationsForDealerNavigation,
  markAsRead,
};
