var express = require('express');
var uploadRouter = express.Router();
var ImageUploadController = require('./../uploadControllers/imageUploadController');
var ImageUploadService = require('./../awsUploadServices/imageUploadService');

//Upload routes
uploadRouter.route('/image/:uploadApp/:uploadTo/:userId').post(ImageUploadController.imageUpload);

//Delete routes
uploadRouter.route('/image/delete').put(ImageUploadService.deleteImage);

module.exports = uploadRouter;