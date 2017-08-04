var express = require('express');
var commonRouter = express.Router();
var commonController = require('./../commonController/commonController');
//Common Routes
commonRouter.route('/country/all').get(commonController.getCountry);
commonRouter.route('/state/all/:countryid').get(commonController.getState);
commonRouter.route('/city/all/:stateid').get(commonController.getCity);
module.exports=commonRouter;