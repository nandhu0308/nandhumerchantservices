var BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');


var getChannelCategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                BroadcasterChannel.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        is_active: true
                    }
                }).then(function (channelCategoryAll) {
                    res.status(200).json(channelCategoryAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No channel category found...'
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


var getChannelCategoryById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                channelCategoryId = req.params.id;
                BroadcasterChannel.findById(channelCategoryId, {
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    }
                }).then(channelCategory => {
                    if (channelCategory === null) {
                        res.status(404).json({
                            message: 'No channel Category found...'
                        });
                    } else {
                        res.status(200).json(channelCategory);
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'No Channel Category found...'
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
   getChannelCategory:getChannelCategory,
   getChannelCategoryById:getChannelCategoryById
}