var express = require('express');
var broadcasterRouter = express.Router();

var broadcastersController = require('./../broadcasterControllers/broadcastersController');
var broadcasterChannelController = require('./../broadcasterControllers/broadcasterChannelController');
var broadcasterVideoController = require('./../broadcasterControllers/broadcasterVideosController');

//Broadcaster Routes

broadcasterRouter.route('/get/:id').get(broadcastersController.getBroadcastersEGLById);
broadcasterRouter.route('/get/:id/:ccategoryId').get(broadcastersController.getBroadcastersEGLByCategoryId);
broadcasterRouter.route('/all').get(broadcastersController.getBroadcastersEGLAll);
broadcasterRouter.route('/broadcasterVideo/update').put(broadcastersController.updateBroadcasterVideoStreamKey);

//Broadcaster Destination
broadcasterRouter.route('/destination/all').get(broadcastersController.getBroadcasterDestination);

module.exports=broadcasterRouter;