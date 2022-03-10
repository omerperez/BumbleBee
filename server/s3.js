 const dotenv = require("dotenv");
 const multer = require("multer");
 const multerS3 = require("multer-s3");
 const aws = require("aws-sdk");

dotenv.config();
aws.config.update({ 
  region: "eu-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const bucketName = "bumblebee-pro";

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    key: function (req, file, cb) {
      var fileExtension = file.originalname.split(".")[1];
      var path = "uploads/" + req.user._id + Date.now() + "." + fileExtension; /* TODO: what is the path? */
      cb(null, path);
    }
  })
});

module.exports = {
  upload,
};