var express = require('express');
var uploadRouter = express.Router();
var ImageUploadController = require('./../uploadControllers/imageUploadController');
var VideoUploadController = require('./../uploadControllers/videoUploadController');
var ImageUploadService = require('./../awsUploadServices/imageUploadService');

//Upload routes
uploadRouter.route('/image/:uploadApp/:uploadTo/:userId').post(ImageUploadController.imageUpload);
uploadRouter.route('/video/:uploadApp/:uploadTo/:userId').post(VideoUploadController.videoUpload);

//Delete routes
uploadRouter.route('/image/delete').put(ImageUploadService.deleteImage);

module.exports = uploadRouter;