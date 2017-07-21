var express = require('express');
var broadcasterRouter = express.Router();

var broadcastersController = require('./../broadcasterControllers/broadcastersController');
var channelCategoryController = require('./../broadcasterControllers/channelCategoryController');
var broadcasterVideoController = require('./../broadcasterControllers/broadcasterVideosController');

//Broadcaster Routes

broadcasterRouter.route('/get/:id').get(broadcastersController.getBroadcastersEGLById);
broadcasterRouter.route('/get/:id/:ccategoryId').get(broadcastersController.getBroadcastersEGLByCategoryId);
broadcasterRouter.route('/all').get(broadcastersController.getBroadcastersEGLAll);
broadcasterRouter.route('/broadcasterVideo/update').put(broadcastersController.updateBroadcasterVideoStreamKey);


module.exports=broadcasterRouter;