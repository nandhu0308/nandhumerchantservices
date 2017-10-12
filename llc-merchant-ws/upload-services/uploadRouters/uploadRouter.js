var express = require('express');
var uploadRouter = express.Router();
var ImageUploadController = require('./../uploadControllers/imageUploadController');
var VideoUploadController = require('./../uploadControllers/videoUploadController');
var SQSBroadcasterController = require('./../uploadControllers/sqsBroadcasterController');
var ImageUploadService = require('./../awsUploadServices/imageUploadService');
var MultiplatformUploaderService = require('./../multiplatform-services/multiplatform-uploader-service');

//Upload routes
uploadRouter.route('/image/:uploadApp/:uploadTo/:userId').post(ImageUploadController.imageUpload);
uploadRouter.route('/video/:uploadApp/:uploadTo/:userId').post(VideoUploadController.videoUpload);
uploadRouter.route('/video/queue/:queueParams').post(VideoUploadController.videoUploadQueue);
uploadRouter.route('/video/move/s3').post(VideoUploadController.videoUploadToS3);
uploadRouter.route('/sqs/:sqsParams').post(SQSBroadcasterController.sendMessage);
uploadRouter.route('/tester').post(MultiplatformUploaderService.uploadVideo);

//Delete routes
uploadRouter.route('/image/delete').put(ImageUploadService.deleteImage);

module.exports = uploadRouter;