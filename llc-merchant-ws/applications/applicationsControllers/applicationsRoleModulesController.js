var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var ApplicationsRoleModules = require('./../applicationsModels/applicationRoleModulesModel');
var AssignedUserRoleModules = require('./../applicationsModels/assignedUserRoleModuleModel');

var newApplicationsRoleModule = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                if (reqObj != null) {
                    ApplicationsRoleModules.create({
                        application_id: reqObj.application_id,
                        module_id: reqObj.module_id,
                        role_module_name: reqObj.role_module_name,
                        is_active: reqObj.is_active,
                        created_by: reqObj.created_by,
                        last_updated_by: reqObj.last_updated_by
                    }).then(function (appRolesModule) {
                        res.status(200).json({
                            id: appRolesModule.id,
                            message: 'success'
                        })
                    }).catch(function (err) {
                        res.status(500).json({
                            errMessage: err,
                            message: 'something went wrong...'
                        })
                    });
                } else {
                    res.status(500).json({
                        message: 'No Request Body Found...'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message: 'Token Expired...'
            });
        }
    }).catch(function (err) {
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var assigningUserRoleModules = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                if (reqObj != null) {
                    AssignedUserRoleModules.create({
                        user_id: reqObj.user_id,
                        role_module_id: reqObj.role_module_id,
                        is_active: reqObj.is_active,
                        created_by: reqObj.created_by,
                        last_updated_by: reqObj.last_updated_by
                    }).then(function (assignedRole) {
                        res.status(200).json({
                            id: assignedRole.id,
                            message: 'success'
                        });
                    }).catch(function (err) {
                        res.status(500).json({
                            errMessage: err,
                            message: 'something went wrong...'
                        });
                    });
                } else {
                    res.status(500).json({
                        message: 'No Request Body Found...'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message: 'Token Expired...'
            });
        }
    }).catch(function (err) {
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

module.exports = {
    newApplicationsRoleModule: newApplicationsRoleModule,
    assigningUserRoleModules: assigningUserRoleModules
}