var express = require('express');
var entertainmentRouter = express.Router();

var broadcasterController = require('./../entertainmentControllers/broadcasterController');
var categoryLanguageController = require('./../entertainmentControllers/categoryLanguageController');
var broadcasterAlbumsController = require('./../entertainmentControllers/broadcasterAlbumsController');

//Broadcaster routes
entertainmentRouter.route('/broadcaster/new').post(broadcasterController.newBroadcaster);

//Broadcaster Category and language routes
entertainmentRouter.route('/category/new').post(categoryLanguageController.newCategory);
entertainmentRouter.route('/language/new').post(categoryLanguageController.newLanguage);

//Broadcaster albums routes
entertainmentRouter.route('/broadcaster/album/new').post(broadcasterAlbumsController.newAlbum);

module.exports = entertainmentRouter;