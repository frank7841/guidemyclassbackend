require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");
// const s3 = require('aws-sdk/clients/s3')
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "eu-north-1",
});

const storage = new multerS3({
  acl: "public-read",
  //ACL: "public-read",
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // console.log(file);
  if (
    // file.mimetype === "image/jpeg" ||
    // file.mimetype === "image/png" ||
    // file.mimetype === "image/svg" ||
    // file.mimetype === "image/jpg" ||
    // file.mimetype === "image/gif" ||
    // file.mimetype === "image/heif" ||
    // file.mimetype === "audio/aac" ||
    // file.mimetype === "image/heif" ||
    // file.mimetype === "audio/mpeg" ||
    // file.mimetype === "video/mpeg" ||
    // file.mimetype === "video/mp4" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.mimetype === "application/vnd.ms-powerpoint" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "text/csv" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "image/hevc"
  ) {
    cb(null, true);
  } else {
    cb(new Error("unsported format"), false);
  }
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
  fileFilter: fileFilter,
});
