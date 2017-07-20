var express = require('express');
var broadcasterRouter = express.Router();

var broadcastersController = require('./../broadcasterControllers/broadcastersController');
var channelCategoryController = require('./../broadcasterControllers/channelCategoryController');
var broadcasterVideoController = require('./../broadcasterControllers/broadcasterVideosController');

//Broadcaster Routes

broadcasterRouter.route('/broadcaster/get/:id').get(broadcastersController.getBroadcastersEGL);

module.exports=broadcasterRouter;