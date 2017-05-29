var express = require('express');
var applicationRouter = express.Router();

var applicationsController = require('./../applicationsControllers/applicationsController');
var applicationsModulesController = require('./../applicationsControllers/applicationsModulesController');

//Applications Routes
applicationRouter.route('/app/new').post(applicationsController.newAplication);

//Applications Modules Routes
applicationRouter.route('/app/module/new').post(applicationsModulesController.newApplicationsModule);

module.exports = applicationRouter;