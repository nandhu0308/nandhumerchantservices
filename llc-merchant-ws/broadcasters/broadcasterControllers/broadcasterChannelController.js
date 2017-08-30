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

//Create a broadcaster channels .

var createBroadcasterChannel = function (req, res) {
    userAuthObj = JSON.parse(UserAuthServices.validateAuthentication(req));
    if (userAuthObj.authorize) {
        reqObj = req.body;
        return sequelize.transaction().then(function (t) {
            return BroadcasterChannel.create({
                broadcaster_id: broadcasterResults.broadcaster_id,
                category_id: reqObjChannel.category_id,
                channel_name: reqObjChannel.channel_name,
                yt_streamtarget_name: reqObjChannel.yt_streamtarget_name,
                fb_streamtarget_name: reqObjChannel.fb_streamtarget_name,
                ha_streamtarget_name: reqObjChannel.ha_streamtarget_name,
                channel_image: reqObjChannel.channel_image,
                image_file_name: reqObjChannel.image_file_name,
                rank: reqObjChannel.rank,
                is_active: reqObjChannel.is_active,
                created_by: reqObjChannel.created_by,
                updated_by: reqObjChannel.updated_by
            }, { transaction: t });
        }).then(function () {
            return t.commit();
        }).catch(function (err) {
            return t.rollback();
        });
    }
};

var getBroadcasterChannelByBroadcasterId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                broadcasterId= req.params.broadcasterId;
                BroadcasterChannel.findAll({
                    where: {
                        broadcaster_id: broadcasterId,
                        is_active: true
                    },
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    }
                }).then(channels => {
                    res.status(200).json(channels);
                }).catch(function(err){
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong'
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
    getChannelCategory: getChannelCategory,
    getChannelCategoryById: getChannelCategoryById,
    createBroadcasterChannel: createBroadcasterChannel,
    getBroadcasterChannelByBroadcasterId: getBroadcasterChannelByBroadcasterId
}