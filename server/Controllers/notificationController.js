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
async function createAlert(req, res) {
  const alertFromJason = JSON.parse(req.body.alert);
  const createAlert = new carSchema({
    _id: new mongoose.Types.ObjectId(),
    car: alertFromJason.car,
    dealer: alertFromJason.dealer,
    client: alertFromJason.client,
    isCancelRequest: false,
    dateOfCreated: Date.now(),
    step: 1,
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

  let updateUser = await userSchema.findById(createAlert.dealer);
  if (updateUser.role !== 1) {
    return res.status(400).json({
      message: "Access blocked - you are not an administrator user",
    });
  }
  const newAlert = await notificationSchema.create(createAlert);
  const filter = { _id: updateUser._id };
  const update = new userSchema({
    _id: updateUser._id,
    isSendReq: updateUser.isSendReq,
  });

  await userSchema.findOneAndUpdate(filter, update, { new: true });
  return res.send(newAlert._id);
}

/* PUT */
const comfirmPaymentAlert = async (req, res) => {
  
  const alertFromJason = JSON.parse(req.body.alert);
  const alertId = { _id: req.body._id };
  const alert = await carSchema.findById(alertId);

  if (alert.dealer.valueOf() != alertFromJason.dealer) {
    return res.status(400).json({
      message: "Access blocked - you are not owner on this car",
    });
  }

  if (alertFromJason.isCancelRequest && alertFromJason.isCancelRequest == true){
      let updateUser = await userSchema.findById(createAlert.dealer);
      const filter = { _id: updateUser._id };
      const update = new userSchema({
        _id: updateUser._id,
        isSendReq: false,
      });

      await userSchema.findOneAndUpdate(filter, update, { new: true });
  }
  
  notificationSchema
      .findOneAndUpdate(alertId, alertFromJason, { new: true })
      .then((updateAlert) => res.json(updateAlert))
      .catch((err) => res.status(400).json("Error: " + err));
};

/* EXPORTS */
module.exports = {
  getAllNotification,
  getNotificationsByUserId,
  createAlert,
  comfirmPaymentAlert,
};
