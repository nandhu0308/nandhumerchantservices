var express = require('express');
var adRouter = express.Router();

var LogoAdsController = require('./../ads-controllers/logo-ads-controller');
var AssignAdsController = require('./../ads-controllers/assign-ads-controller');
var VideoAdController = require('./../ads-controllers/video-ads-controller');

adRouter.route('/logo/image/:appName').post(LogoAdsController.uploadLogoAdImage);
adRouter.route('/logo/new').post(LogoAdsController.newLogoAd);
adRouter.route('/logo/get/channel/:channelId').get(LogoAdsController.getLogoAdsByChannelId);
<<<<<<< HEAD
//adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEventsWithTrans);
adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEvents);
adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEvents);
adRouter.route('/get/event/:channelId/date/:eventDate').get(AssignAdsController.getAdEventsByDate);
=======
adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEventsWithTrans);
//adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEvents);
>>>>>>> 58225ff60e772834b2ba42b2092cad92016e0764

adRouter.route('/videoad/video/:appName').post(VideoAdController.uploadVideoAd);
adRouter.route('/videoad/new').post(VideoAdController.newVideoAd);
adRouter.route('/videoads/get/channel/:channelId').get(VideoAdController.getVideoAdsByChannel);
adRouter.route('/videoads/assign').post(AssignAdsController.assignVideoAdsEvents);

module.exports = adRouter;