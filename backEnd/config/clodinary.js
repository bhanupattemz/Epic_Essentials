const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require('dotenv').config({ path: "./backEnd/config/.env" })


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Epic Essentials",
        allowedFormats: ['jpeg', 'jpg', 'png']
    }
});

module.exports = { cloudinary, storage };