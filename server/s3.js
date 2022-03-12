const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const aws = require("aws-sdk");

dotenv.config();
aws.config.update({ region: "eu-west-1" });

const region = "eu-west-1";
const bucketName = "bumblebee-pro";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { filedName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = {
  upload,
};