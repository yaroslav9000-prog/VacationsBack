const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

const result = require("dotenv").config();
const env = result.parsed;


cloudinary.config({
    cloud_name : env["CLOUDINARY_API_SECRET"],
    api_key : env["CLOUDINARY_API_KEY"],
    api_secret : env["CLOUDINARY_CLOUD_NAME"]
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder: "Vacations_Images",
    allowedFormats: ["jpg", "jpeg", "png"]
})

export {
    cloudinary,
    storage
}