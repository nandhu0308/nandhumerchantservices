var express = require('express');
var uploadRouter = express.Router();
var ImageUploadController = require('./../uploadControllers/imageUploadController');

uploadRouter.route('/image/:uploadApp/:uploadTo/:userId').post(ImageUploadController.imageUpload);

module.exports = uploadRouter;