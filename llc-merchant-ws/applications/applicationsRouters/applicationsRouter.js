var express = require('express');
var applicationRouter = express.Router();

var applicationsController = require('./../applicationsControllers/applicationsController');
var applicationsModulesController = require('./../applicationsControllers/applicationsModulesController');
var applicationsRoleModulesController = require('./../applicationsControllers/applicationsRoleModulesController');

//Applications Routes
applicationRouter.route('/app/new').post(applicationsController.newAplication);
applicationRouter.route('/app/all').get(applicationsController.getApplicationsList);

//Applications Modules Routes
applicationRouter.route('/app/module/new').post(applicationsModulesController.newApplicationsModule);
applicationRouter.route('/modules/all').get(applicationsModulesController.getAllModules);

//Applications Role Modules Routes
applicationRouter.route('/app/role/new').post(applicationsRoleModulesController.newApplicationsRoleModule);
applicationRouter.route('/app/role/assign').post(applicationsRoleModulesController.assigningUserRoleModules);
applicationRouter.route('/app/role/all').get(applicationsRoleModulesController.getAllRoles);


module.exports = applicationRouter;