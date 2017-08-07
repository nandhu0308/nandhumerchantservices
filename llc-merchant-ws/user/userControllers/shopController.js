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
                }).then( shop => {
                    console.log('successfully created');
                    res.status(200).json({
                        id: shop.id,
                        message: 'success'
                    });
                }).catch(function(err){
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

module.exports = {
    newShop: newShop
};