"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var cloudinary = require('cloudinary').v2;

var dotenv = require('dotenv');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var uploadImage = function uploadImage(img) {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(img.tempFilePath, {
      public_id: "teamwork/".concat(uniqueFilename)
    }, function (err, res) {
      return err ? reject(err) : resolve(res.url);
    });
  });
};

exports.uploadImage = uploadImage;