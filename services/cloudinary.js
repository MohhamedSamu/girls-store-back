"use strict";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dae0fnrdt', 
    api_key: '631496324881983', 
    api_secret: 'pmzZUAc4JvNJp-h0lLktvSzlPUA' 
});

const cloudinaryService = {};

cloudinaryService.uploadCloudinaryImageUrl = async (folder, image) => {
    let result = [];
    try {
      result = await cloudinary.uploader.upload(image, { upload_preset: folder });
    } catch (e) {
      console.log("Error", e);
    }
    return result;
};

cloudinaryService.createFolder = async (folder) => {
    let result = [];
    try {

      result = await cloudinary.api.create_upload_preset({
        name: folder,
        folder: folder,
        allowed_formats: 'jpg, png',

      });

    } catch (e) {
      console.log("Error", e);
    }
    return result;
};

module.exports = cloudinaryService;
