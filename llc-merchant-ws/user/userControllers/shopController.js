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

var newShop = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                reqUser = reqObj.user;
                console.log(reqObj);
                console.log(reqUser);
                Shop.create({
                    application_id: reqObj.application_id,
                    seller_shop_name: reqObj.seller_shop_name,
                    about_shop: reqObj.about_shop,
                    shop_code: reqObj.shop_code,
                    seller_location_latitude: reqObj.seller_location_latitude,
                    seller_location_longitude: reqObj.seller_location_longitude,
                    seller_kyc_doc_type: reqObj.seller_kyc_doc_type,
                    seller_kyc_doc_value: reqObj.seller_kyc_doc_value,
                    is_deleted: reqObj.is_deleted,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(shop => {
                    ApplicationUsers.create({
                        application_id: reqUser.application_id,
                        user_type: reqUser.user_type,
                        user_name: reqUser.user_name,
                        user_short_name: reqUser.user_short_name,
                        country: reqUser.country,
                        city: reqUser.city,
                        zip: reqUser.zip,
                        country_iso_code: reqUser.country_iso_code,
                        device_mac: reqUser.device_mac,
                        mobile: reqUser.mobile,
                        email_id: reqUser.email_id,
                        passwd: reqUser.passwd,
                        client_id: shop.id,
                        is_anonymous: reqUser.is_anonymous,
                        is_active: reqUser.is_active,
                        created_by: reqUser.created_by,
                        last_updated_by: reqUser.last_updated_by
                    }).then(user => {
                        roleId = reqUser.roleId;
                        ApplicationsRoleModel.findById(roleId).then(appRole => {
                            if (appRole === null) {
                                res.status(404).json({
                                    message: 'roles not found!'
                                })
                            } else {
                                ApplicationsRoleModules.findAll({
                                    where: {
                                        role_id: roleId,
                                        is_active: true
                                    }
                                }).then(rolesModules => {
                                    if (rolesModules.length > 0) {
                                        for (var i = 0; i < rolesModules.length; i++) {
                                            AssignedUserRoleModules.create({
                                                user_id: user.id,
                                                role_module_id: rolesModules[i].id,
                                                is_active: true,
                                                created_by: reqUser.created_by,
                                                last_updated_by: reqUser.last_updated_by
                                            }).then(assignedRoles => {
                                                console.log('roles assigned');
                                            }).catch(function(err){
                                                console.log(err);
                                            });
                                        }
                                    }
                                }).catch(function (err) {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err,
                                        message: 'somehing went wrong!'
                                    });
                                });
                            }
                        }).catch(function (err) {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                message: 'somehing went wrong!'
                            });
                        });
                        res.status(200).json({
                            user_id: user.id,
                            shop_id: shop.id,
                            message: 'success'
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            message: 'somehing went wrong!'
                        });
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'somehing went wrong!'
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

var getShopById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                shopId = req.params.shopId;
                Shop.findById(shopId).then(shop => {
                    if (shop === null) {
                        res.status(404).json({
                            message: 'No shop found!'
                        })
                        return;
                    }
                    res.status(200).json(shop);
                }).catch(function (err) {
                    res.status(500).json({
                        error: err,
                        message: 'something wenr wrong!'
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

module.exports = {
    newShop: newShop,
    getShopById: getShopById
};