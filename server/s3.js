// const AWS = require("aws-sdk");
// const dotenv = require("dotenv");
// const multer = require("multer");

// dotenv.config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const storage = multer.memoryStorage({
//   destination: function (req, files, callback) {
//     callback(null, "");
//   },
// });

// var upload = multer({ storage }).any();

// module.exports = {
//     s3,
//     storage,
//     upload
// };
