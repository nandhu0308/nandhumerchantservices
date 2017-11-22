var express = require('express');
var adRouter = express.Router();

var LogoAdsController = require('./../ads-controllers/logo-ads-controller');
var AssignAdsController = require('./../ads-controllers/assign-ads-controller');

adRouter.route('/logo/image/:appName').post(LogoAdsController.uploadLogoAdImage);
adRouter.route('/logo/new').post(LogoAdsController.newLogoAd);
adRouter.route('/logo/get/channel/:channelId').get(LogoAdsController.getLogoAdsByChannelId);

adRouter.route('/logo/assign').post(AssignAdsController.assignLogoAdEvents);

module.exports = adRouter;