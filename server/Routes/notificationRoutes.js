const express = require("express");
const mongoose = require("mongoose");
const notificationController = require("../Controllers/notificationController");
const router = express.Router();
const { upload } = require("../s3");

router.get("/", notificationController.getAllNotification);

router.get("/notification-user/:id", notificationController.getNotificationsByUserId);

router.post("/create", notificationController.createNotification)

module.exports = router;
