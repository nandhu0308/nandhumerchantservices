var ApplicaionsModules = require('./../applicationsModels/applicationsModulesModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newApplicationsModule = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                if (reqObj !== null) {
                    ApplicaionsModules.create({
                        application_id: reqObj.application_id,
                        module_name: reqObj.module_name,
                        module_title: reqObj.module_title,
                        module_path: reqObj.module_path,
                        load_children: reqObj.load_children,
                        module_data: reqObj.module_data,
                        data_icon: reqObj.data_icon,
                        module_parentid: reqObj.module_parentid,
                        disp_sequence: reqObj.disp_sequence,
                        is_active: reqObj.is_active,
                        is_read: reqObj.is_read,
                        is_denied: reqObj.is_denied,
                        created_by: reqObj.created_by,
                        last_updated_by: reqObj.last_updated_by
                    }).then(applicationsModules => {
                        res.status(200).json({
                            id: applicationsModules.id,
                            message: 'success'
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).json({
                            err: err,
                            message: 'Creating Failed...'
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

var getAllModules = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                ApplicaionsModules.findAll({
                    where: {
                        is_active: true
                    }
                }).then( applicationModules => {
                    res.status(200).json(applicationModules);
                }).catch(function(err){
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'something went wrong...'
                    })
                });
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
    newApplicationsModule: newApplicationsModule,
    getAllModules : getAllModules
}