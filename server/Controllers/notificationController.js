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


const getNotificationsByClientId = (req, res) => {

  const userId = req.params.id;

  notificationSchema.find().then((results) => {
    try {
      res.json(results.filter((notification) => notification.client == userId));
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
};


const getNotificationsByUserId = (req, res) => {
  console.log(req.params.id);
    const userId = req.params.id;
    notificationSchema.find().then((results) => {
    try {
      res.json(
        results.filter(
          (notification) => notification.dealer == userId
        )
      );
      console.log("OK");
    } catch {
      console.log("Error");
    }
  });
}

/* POST */
async function createAlert(req, res) {
  const alertFromJason = JSON.parse(req.body.alert);
  const createAlert = new notificationSchema({
    _id: new mongoose.Types.ObjectId(),
    car: alertFromJason.car,
    dealer: alertFromJason.dealer,
    client: alertFromJason.client,
    isCancelRequest: false,
    dateOfCreated: Date.now(),
    lastUpdateDate: Date.now(),
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

  let updateUser = await userSchema.findById(createAlert.client);
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
  console.log("Success");
  return res.send("Success");
}

/* PUT */
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
      let updateUser = await userSchema.findById(createAlert.dealer);
      const filter = { _id: updateUser._id };
      const update = new userSchema({
        _id: updateUser._id,
        isSendReq: false,
      });

      await userSchema.findOneAndUpdate(filter, update, { new: true });
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

    let carSell = await carSchema.findById(alertFromJason.car);
    const filter = { _id: alertFromJason.car };
    const update = new carSchema({
      _id: carSell._id,
      isSell: true,
    });

    await carSchema.findOneAndUpdate(filter, update, { new: true });
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
  editAlert,
  getNotificationsByClientId,
};
