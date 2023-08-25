const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const getBucket = (bucketName) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
    };
    storage.listObjectsV2(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const uploadFile = (bucketName, file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const params = new PutObjectCommand({
    Bucket: bucketName,
    Key: file.name,
    Body: stream,
  });

  return new Promise((resolve, reject) => {
    storage.send(params, (err, data) => {
      if (err) reject(err);
      else {
        console.log(data);
        resolve(data);
      }
    });
  });
};

module.exports = { getBucket, uploadFile };
