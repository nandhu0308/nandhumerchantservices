var express = require('express');
var applicationRouter = express.Router();

var applicationsController = require('./../applicationsControllers/applicationsController');

//Applications Routes
applicationRouter.route('/app/new').post(applicationsController.newAplication);

module.exports = applicationRouter;