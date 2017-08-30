var express = require('express');
var commonRouter = express.Router();
var commonController = require('./../commonController/commonController');
var languageController = require('./../commonController/languageController');
//Common Routes
commonRouter.route('/country/all').get(commonController.getCountry);
commonRouter.route('/state/all/:countryid').get(commonController.getState);
commonRouter.route('/city/all/:stateid').get(commonController.getCity);
commonRouter.route('/rank/all').get(commonController.getDisplayRank);
commonRouter.route('/lang/all').get(commonController.getLanguage);
module.exports=commonRouter;