var express = require('express');
var broadcasterRouter = express.Router();

var broadcastersController = require('./../broadcasterControllers/broadcastersController');
var broadcasterChannelController = require('./../broadcasterControllers/broadcasterChannelController');
var broadcasterVideoController = require('./../broadcasterControllers/broadcasterVideosController');

//Broadcaster Routes

broadcasterRouter.route('/get/:id').get(broadcastersController.getBroadcastersEGLById);
broadcasterRouter.route('/get/:id/:ccategoryId').get(broadcastersController.getBroadcastersEGLByCategoryId);
broadcasterRouter.route('/all').get(broadcastersController.getBroadcastersEGLAll);
broadcasterRouter.route('/broadcasterytVideo/update').put(broadcastersController.updateBroadcasterVideoYTStreamKey);
broadcasterRouter.route('/broadcasterfbVideo/update').put(broadcastersController.updateBroadcasterVideoFBStreamKey);
broadcasterRouter.route('/broadcasterhaVideo/update').put(broadcastersController.updateBroadcasterVideoHAStreamKey);

//Broadcaster Destination
broadcasterRouter.route('/destination/all').get(broadcastersController.getBroadcasterDestination);

module.exports=broadcasterRouter;