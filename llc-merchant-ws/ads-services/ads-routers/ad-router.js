var express = require('express');
var adRouter = express.Router();

var LogoAdsController = require('./../ads-controllers/logo-ads-controller');
var AssignAdsController = require('./../ads-controllers/assign-ads-controller');
var VideoAdController = require('./../ads-controllers/video-ads-controller');

adRouter.route('/logo/image/:appName').post(LogoAdsController.uploadLogoAdImage);
adRouter.route('/logo/new').post(LogoAdsController.newLogoAd);
adRouter.route('/logo/get/channel/:channelId').get(LogoAdsController.getLogoAdsByChannelId);
adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEventsWithTrans);
//adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEvents);

adRouter.route('/videoad/video/:appName').post(VideoAdController.uploadVideoAd);
adRouter.route('/videoad/new').post(VideoAdController.newVideoAd);
adRouter.route('/videoads/get/channel/:channelId').get(VideoAdController.getVideoAdsByChannel);
adRouter.route('/videoads/assign').post(AssignAdsController.assignVideoAdsEvents);

module.exports = adRouter;