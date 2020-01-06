const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


export const uploadImage = (img) => new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      img.tempFilePath,
      { public_id: `teamwork/${uniqueFilename}` },
      (err, res) => (err ? reject(err) : resolve(res.url))
    );
  });