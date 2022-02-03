const aws =require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const region = "eu-west-1";
const bucketName = "bumblebee-pro";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
})

module.exports = s3;