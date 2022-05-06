const express = require("express");
const mongoose = require("mongoose");
const notificationController = require("../Controllers/notificationController");
const router = express.Router();
const { upload } = require("../utils/s3");

router.get("/", notificationController.getAllNotification);

router.get("/client/:id", notificationController.getNotificationsByClientId);

router.get("/user/:id", notificationController.getNotificationsByUserId);

router.get(
  "/client/navigation/:id",
  notificationController.getNotificationsForClientNavigation
);

router.get(
  "/dealer/navigation/:id",
  notificationController.getNotificationsForDealerNavigation
);

router.post(
  "/create",
  upload.fields([
    { name: "payment", maxCount: 1000 },
  ]),
  notificationController.createAlert
);

router.put(
  "/update/:id",
  upload.fields([
    { name: "govil", maxCount: 1000 },
    { name: "dhl", maxCount: 1000 },
    { name: "license", maxCount: 1000 },
    { name: "shipping", maxCount: 1000 },
  ]),
  notificationController.editAlert
);

router.put("/read/:id", notificationController.markAsRead);

(module.exports = router);
