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
broadcasterRouter.route('/broadcasterpsVideo/update').put(broadcastersController.updateBroadcasterVideoPSStreamKey);
broadcasterRouter.route('/broadcasterwithchannel/new').post(broadcastersController.createBroadcasterwithChannel);
broadcasterRouter.route('/broadcasterwithchannel/create').post(broadcastersController.newBroadcasterwithChannel);

//Broadcaster Destination
broadcasterRouter.route('/destination/all/:channelid').get(broadcastersController.getBroadcasterDestination);

//Broadcaster Channel
broadcasterRouter.route('/broadcasterchannel/new').post(broadcasterChannelController.createBroadcasterChannel);
broadcasterRouter.route('/broadcasterchannel/all').get(broadcasterChannelController.getChannelCategory);
broadcasterRouter.route('/broadcastercategory/all').get(broadcastersController.getBroadcasterCategory);
broadcasterRouter.route('/broadcasterchannel/broadcaster/:broadcasterId').get(broadcasterChannelController.getBroadcasterChannelByBroadcasterId);

//Broadcaster videos routes
broadcasterRouter.route('/broadcasterVideo/new').post(broadcasterVideoController.newVideo);
broadcasterRouter.route('/videos/list/pcv/:broadcasterId').get(broadcasterVideoController.getPrimaryChannelVideosByBroadcasterId);
broadcasterRouter.route('/videos/list/pgn/:channelId/:lastVideoId').get(broadcasterVideoController.getVideosByChannelPagination);
broadcasterRouter.route('/videos/list/channel/:channelId').get(broadcasterVideoController.getVideosByChannel);

module.exports=broadcasterRouter;