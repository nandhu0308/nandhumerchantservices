var dateformat = require('dateformat');
var ApplicationUsers = require('./../userModels/applicationUsersModel');
var ApplicationsModules = require('./../../applications/applicationsModels/applicationsModulesModel');
var ApplicationsRoleModules = require('./../../applications/applicationsModels/applicationRoleModulesModel');
var ApplicationsRoleModel = require('./../../applications/applicationsModels/applicationsRolesModel');
var AssignedUserRoleModules = require('./../../applications/applicationsModels/assignedUserRoleModuleModel');
var UserSessions = require('./../userModels/userSessionModel');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var Broadcaster = require('./../../broadcasters/broadcasterModels/broadcastersModel');
var Shop = require('./../userModels/shopsModel');
var TokenValidator = require('./../services/tokenValidator');
var sequelize = require('sequelize');
var GoogleClientKeysModel = require('./../userModels/ClientKeysModel');

var newUserRegistration = function (req, res) {
    reqObj = req.body;
    if (reqObj.user_type === 'User') {
      
        ApplicationUsers.create({
            application_id: reqObj.application_id,
            client_id: reqObj.client_id,
            user_type: reqObj.user_type,
            user_name: reqObj.user_name,
            user_short_name: reqObj.user_short_name,
            country: reqObj.country,
            city: reqObj.city,
            zip: reqObj.zip,
            country_iso_code: reqObj.country_iso_code,
            device_id: reqObj.device_mac,
            mobile: reqObj.mobile,
            email_id: reqObj.email_id,
            passwd: reqObj.passwd,
            is_anonymous: reqObj.is_anonymous,
            is_active: reqObj.is_active,
            created_by: reqObj.created_by,
            last_updated_by: reqObj.last_updated_by
        }).then(newUser => {
            res.status(200).json({
                id: newUser.id,
                message: 'success'
            });
        }).catch(function (err) {
            res.status(500).json({
                errMessage: err,
                message: 'something went wrong...'
            });
        });
    } else {
        ApplicationUsers.create({
            application_id: reqObj.application_id,
            client_id: reqObj.client_id,
            user_type: reqObj.user_type,
            user_name: reqObj.user_name,
            user_short_name: reqObj.user_short_name,
            country: reqObj.country,
            city: reqObj.city,
            zip: reqObj.zip,
            country_iso_code: reqObj.country_iso_code,
            device_id: reqObj.device_mac,
            mobile: reqObj.mobile,
            email_id: reqObj.email_id,
            passwd: reqObj.passwd,
            is_anonymous: reqObj.is_anonymous,
            is_active: reqObj.is_active,
            created_by: reqObj.created_by,
            last_updated_by: reqObj.last_updated_by
        }).then(newUser => {
            roleId = reqObj.roleId;
            ApplicationsRoleModules.findAll({
                where: {
                    role_id: roleId
                }
            }).then(rolesModules => {
                console.log(rolesModules.length);
                if (rolesModules.length > 0) {
                    for (var i = 0; i < rolesModules.length; i++) {
                        AssignedUserRoleModules.create({
                            user_id: newUser.id,
                            role_module_id: rolesModules[i].id,
                            is_active: true,
                            created_by: reqObj.created_by,
                            last_updated_by: reqObj.last_updated_by
                        }).then(assignedRole => {
                            console.log('new role added');
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                    res.status(200).json({
                        id: newUser.id,
                        message: 'success'
                    });
                }
            }).catch(function (err) {
                res.status(500).json({
                    errMessage: err,
                    message: 'something went wrong...'
                });
            })
        }).catch(function (err) {
            res.status(500).json({
                errMessage: err,
                message: 'something went wrong...'
            });
        });
    }
};

var userLogin = function (req, res) {
    reqObj = req.body;
    var session_id = 0;
    ApplicationUsers.findOne({
        where: {
            email_id: reqObj.email_id,
            passwd: reqObj.passwd
        },
        attributes: {
            exclude: ['created_by', 'created_on', 'last_updated_by', 'last_updated_on', 'passwd']
        }
    }).then(user => {
        if (user === null) {
            res.status(404).json({
                message: 'User Not Found/Check Login Credentials'
            });
        } else {
            var date = new Date();
            var todayDate = dateformat(date, "yyyy-mm-dd h:mm:ss TT");
            var expireDate = dateformat(date.setTime(date.getTime() + 7 * 86400000), "yyyy-mm-dd");
            var userAuthParamObj = {
                user_id: user.id,
                user_mail: user.email_id,
                created_date: todayDate,
                expire_date: expireDate,
            }
            var authToken = UserAuthServices.userAuthTokenGenerator(JSON.stringify(userAuthParamObj));
            if (user.user_type === 'User') {
                UserSessions.create({
                    user_id: user.id,
                    user_type: 'User',
                    session_key: authToken,
                    is_active: true,
                    expire_date: expireDate
                }).then(usession => {
                    res.status(200).json({
                        user_id: user.id,
                        user_app_id: user.application_id,
                        user_type: user.user_type,
                        user_name: user.user_name,
                        user_short_name: user.user_short_name,
                        user_emialid: user.email_id,
                        user_mobile: user.mobile,
                        user_country_code: user.country_iso_code,
                        user_country: user.country,
                        user_city: user.city,
                        user_session_id: usession.id,
                        user_auth_token: authToken,
                        auth_token_expire: expireDate
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        errMessage: err,
                        message: 'something went wrong...'
                    })
                });
            } else if (user.user_type === 'eCommerce' || user.user_type === 'Entertainment' || user.user_type === 'eUser') {
                UserSessions.create({
                    user_id: user.id,
                    user_type: 'Seller',
                    session_key: authToken,
                    is_active: true,
                    expire_date: expireDate
                }).then(usession => {
                    if (user.user_type === 'Entertainment') {
                        Broadcaster.findOne({
                            where: {
                                id: user.client_id,
                                is_active: true
                            },
                            attributes: {
                                exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            }
                        }).then(function (broadcaster) {
                            res.status(200).json({
                                user_id: user.id,
                                user_app_id: user.application_id,
                                user_type: user.user_type,
                                user_name: user.user_name,
                                user_short_name: user.user_short_name,
                                user_emialid: user.email_id,
                                user_mobile: user.mobile,
                                user_country_code: user.country_iso_code,
                                user_country: user.country,
                                user_city: user.city,
                                client_id: user.client_id,
                                broadcaster_name: broadcaster.braodcaster_name,
                                w_appname: broadcaster.w_application_name,
                                primary_channel_id: broadcaster.primary_channel_id,
                                user_session_id: usession.id,
                                user_auth_token: authToken,
                                auth_token_expire: expireDate
                            });
                        }).catch(function (err) {
                            res.status(404).json({
                                errMessage: err,
                                message: 'user not found...'
                            });
                        });
                    } else if (user.user_type === 'eCommerce') {
                        Shop.findOne({
                            where: {
                                id: user.client_id,
                                is_deleted: false
                            },
                            attributes: {
                                exclude: ['created_by', 'created_time', 'updated_by', 'updated_time']
                            }
                        }).then(function (shop) {
                            res.status(200).json({
                                user_id: user.id,
                                user_app_id: user.application_id,
                                user_type: user.user_type,
                                user_name: user.user_name,
                                user_short_name: user.user_short_name,
                                user_emialid: user.email_id,
                                user_mobile: user.mobile,
                                user_country_code: user.country_iso_code,
                                user_country: user.country,
                                user_city: user.city,
                                client_id: user.client_id,
                                shop_name: shop.seller_shop_name,
                                shop_code: shop.shop_code,
                                user_session_id: usession.id,
                                user_auth_token: authToken,
                                auth_token_expire: expireDate
                            });
                        }).catch(function (err) {
                            res.status(404).json({
                                errMessage: err,
                                message: 'user not found...'
                            });
                        });
                    }
                    else if (user.user_type === 'eUser') {
                        Broadcaster.findOne({
                            where: {
                                id: user.client_id,
                                is_active: true
                            },
                            attributes: {
                                exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            }
                        }).then(function (broadcaster) {
                            res.status(200).json({
                                user_id: user.id,
                                user_app_id: user.application_id,
                                user_type: user.user_type,
                                user_name: user.user_name,
                                user_short_name: user.user_short_name,
                                user_emialid: user.email_id,
                                user_mobile: user.mobile,
                                user_country_code: user.country_iso_code,
                                user_country: user.country,
                                user_city: user.city,
                                client_id: user.client_id,
                                broadcaster_name: broadcaster.braodcaster_name,
                                w_appname: broadcaster.w_application_name,
                                primary_channel_id: broadcaster.primary_channel_id,
                                user_session_id: usession.id,
                                user_auth_token: authToken,
                                auth_token_expire: expireDate
                            });
                        }).catch(function (err) {
                            res.status(404).json({
                                errMessage: err,
                                message: 'user not found...'
                            });
                        });
                    }
                }).catch(function (err) {
                    res.status(404).json({
                        errMessage: err,
                        message: 'user not found...'
                    });
                });
            } else if (user.user_type === 'Super Admin') {
                UserSessions.create({
                    user_id: user.id,
                    user_type: 'SA',
                    session_key: authToken,
                    is_active: true,
                    expire_date: expireDate
                }).then(usession => {
                    res.status(200).json({
                        user_id: user.id,
                        user_app_id: user.application_id,
                        user_type: user.user_type,
                        user_name: user.user_name,
                        user_short_name: user.user_short_name,
                        user_emialid: user.email_id,
                        user_mobile: user.mobile,
                        user_country_code: user.country_iso_code,
                        user_country: user.country,
                        user_city: user.city,
                        user_session_id: usession.id,
                        user_auth_token: authToken,
                        auth_token_expire: expireDate
                    });
                }).catch(function (err) {
                    res.status(404).json({
                        errMessage: err,
                        message: 'something went wrong...'
                    });
                });
            }
        }
    }).catch(function (err) {
        res.status(404).json({
            errMessage: err,
            message: 'user not found...'
        });
    });
};

var getUserAssignedModules = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                userId = req.params.userId;
                AssignedUserRoleModules.findAll({
                    where: {
                        user_id: userId,
                        is_active: true
                    },
                    attributes: {
                        exclude: ['created_by', 'created_on', 'last_updated_by', 'last_updated_on']
                    }
                }).then(assignedRoles => {
                    //res.status(200).json(assignedRoles);
                    if (assignedRoles.length > 0) {
                        var modulesArray = [];
                        for (i = 0; i < assignedRoles.length; i++) {
                            ApplicationsRoleModules.findById(assignedRoles[i].role_module_id).then(roleModule => {
                                //res.status(200).json(roleModule);
                                ApplicationsModules.findById(roleModule.module_id,
                                    {
                                        attributes: {
                                            exclude: ['created_by', 'created_on', 'last_updated_by', 'last_updated_on']
                                        }
                                    }).then(modules => {
                                        modulesArray.push(modules.dataValues);
                                        moduleList(res, assignedRoles.length, modulesArray);
                                    }).catch(function (err) {
                                        console.log(err);
                                        res.status(500).json({
                                            error: err,
                                            message: 'something went wrong...'
                                        });
                                    });
                            }).catch(function (err) {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                    message: 'something went wrong...'
                                });
                            })
                        }
                    } else {
                        res.status(404).json({
                            message: 'no roles found...'
                        });
                    }
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'something went wrong...'
                    });
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
        console.log(err);
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var moduleList = function (res, len, modules) {
    if (len === modules.length) {
        res.status(200).json(modules);
    }
}

var userLogout = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    if (expireDate >= todayDate) {
        userObj = req.body;
        UserSessions.findAll({
            where: {
                user_id: userObj.user_id,
                is_active: true
            }
        }).then(function (userSessions) {
            if (userSessions.length > 0) {
                userSessions.forEach(function (i) {
                    UserSessions.findById(i.id).then(function (instance) {
                        instance.updateAttributes({
                            is_active: false
                        }).then(function () {
                        });
                    });
                });
                res.status(200).json({
                    user_id: userObj.user_id,
                    message: 'Logout Success'
                });
            } else {
                res.status(404).json({
                    message: 'Logout failed'
                })
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                errMessage: err,
                message: 'Something Went Wrong...'
            })
        });
    } else {
        res.status(401).json({
            message: 'Not Authorized...'
        });
    }
};

var getVersion = function (req, res) {
    res.status(200).json({
        version: 1.0
    });
};

var userNewAddress = function (req, res) {

};

var getUserById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                userId = req.params.userId;
                ApplicationUsers.findById(userId, {
                    attributes: {
                        exclude: ['created_on', 'last_updated_on']
                    }
                }).then(user => {
                    res.status(200).json(user);
                }).catch(function (err) {
                    res.status(500).json({
                        error: err,
                        message: 'something went wrong!'
                    });
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
        console.log(err);
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var getGoogleClientKeysByUserId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                userId = req.params.userId;
                GoogleClientKeysModel.findOne({
                    where: {
                        user_id: userId,
                        is_active: true
                    }
                }).then(googleKeys => {
                    res.status(200).json(googleKeys);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong'
                    })
                })
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
        console.log(err);
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

module.exports = {
    newUserRegistration: newUserRegistration,
    userLogin: userLogin,
    userLogout: userLogout,
    getVersion: getVersion,
    getUserAssignedModules: getUserAssignedModules,
    getUserById: getUserById,
    getGoogleClientKeysByUserId: getGoogleClientKeysByUserId,
}