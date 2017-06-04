var express = require('express');
var applicationRouter = express.Router();

var applicationsController = require('./../applicationsControllers/applicationsController');
var applicationsModulesController = require('./../applicationsControllers/applicationsModulesController');
var applicationsRoleModulesController = require('./../applicationsControllers/applicationsRoleModulesController');

//Applications Routes
applicationRouter.route('/app/new').post(applicationsController.newAplication);

//Applications Modules Routes
applicationRouter.route('/app/module/new').post(applicationsModulesController.newApplicationsModule);

//Applications Role Modules Routes
applicationRouter.route('/app/role/new').post(applicationsRoleModulesController.newApplicationsRoleModule);
applicationRouter.route('/app/role/assign').post(applicationsRoleModulesController.assigningUserRoleModules);

module.exports = applicationRouter;