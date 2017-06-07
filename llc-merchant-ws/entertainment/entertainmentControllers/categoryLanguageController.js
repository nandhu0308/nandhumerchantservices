var BroadcasterCategory = require('./../entertainmentModels/broadcasterCategoryModel');
var BroadcasterLanguage = require('./../entertainmentModels/broadcasterLanguageModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newCategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                BroadcasterCategory.create({
                    category_name: reqObj.category_name,
                    description: reqObj.description
                }).then(function (braodcasterCategory) {
                    res.status(200).json({
                        id: braodcasterCategory.id,
                        message: 'success'
                    });
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'something went wrong...',
                        errMessage: err
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var newLanguage = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                BroadcasterLanguage.create({
                    language: reqObj.language
                }).then(function (broadcasterLanguage) {
                    res.status(200).json({
                        id: broadcasterLanguage.id,
                        message: 'success'
                    });
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'something went wrong...',
                        errMessage: err
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

module.exports = {
    newCategory: newCategory,
    newLanguage: newLanguage
};