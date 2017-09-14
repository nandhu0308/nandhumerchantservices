var BroadcasterVideos = require('./../broadcasterModels/broadcasterVideosModel');
var BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var Broadcaster = require('./../broadcasterModels/broadcastersModel');

var getBroadcastersVideos = function (req, res) {

    authToken = req.headers.authorization;

    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {

                BroadcasterVideos.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        isActive: true
                    }
                }).then(function (broadcasterVideosAll) {
                    res.status(200).json(broadcasterVideosAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters Videos found...'
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


var getBroadcastersVideosById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                broadcasterVideoId = req.params.id;
                BroadcasterVideos.findById(broadcasterVideoId, {
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    }
                }).then(broadcasterVideo => {
                    if (broadcasterVideo === null) {
                        res.status(404).json({
                            message: 'No broadcaster Video found...'
                        });
                    } else {
                        res.status(200).json(broadcasterVideo);
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'No broadcaster Video found...'
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

var newVideo = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                BroadcasterVideos.create({
                    broadcaster_channel_id: reqObj.broadcaster_channel_id,
                    language_id: reqObj.language_id,
                    video_name: reqObj.video_name,
                    video_thumbnail: reqObj.video_thumbnail,
                    video_description: reqObj.video_description,
                    url: reqObj.url,
                    duration: reqObj.duration,
                    rank: reqObj.rank,
                    is_live: reqObj.is_live,
                    is_active: reqObj.is_active,
                    is_youtube: reqObj.is_youtube,
                    live_ads: reqObj.live_ads,
                    p160: reqObj.p160,
                    p360: reqObj.p360,
                    p720: reqObj.p720,
                    p1080: reqObj.p1080,
                    p_uhd: reqObj.p_uhd,
                    video_type: reqObj.video_type,
                    yt_streamkey: reqObj.yt_streamkey,
                    fb_streamkey: reqObj.fb_streamkey,
                    ha_streamkey: reqObj.ha_streamkey,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by,
                    ps_streamkey: reqObj.ps_streamkey
                }).then(video => {
                    res.status(200).json({
                        id: video.id,
                        message: 'Success'
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'something went wrong'
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

var getVideosByChannel = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                broadcasterId = req.params.broadcasterId;
                console.log(broadcasterId);
                Broadcaster.findById(broadcasterId, {
                    attributes: {
                        exclude: ['created_by', 'broadcaster_created_time', 'updated_by', 'broadcaster_updated_time']
                    }
                }).then(broadcaster => {
                    console.log("broadcaster : "+broadcaster.primary_channel_id);
                    BroadcasterChannel.findById(broadcaster.primary_channel_id, {
                        attributes: {
                            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                        }
                    }).then(channel => {
                        console.log("channel : "+channel);
                        BroadcasterVideos.findAll({
                            where: {
                                broadcaster_channel_id: channel.id
                            },
                            attributes: {
                                exclude: ['created_by', 'video_created_time', 'updated_by', 'video_updated_time']
                            },
                            limit: 10
                        }).then(videos => {
                            res.status(200).json({
                                id: channel.id,
                                application_id: channel.application_id,
                                broadcaster_id: channel.broadcaster_id,
                                lang_id: channel.lang_id,
                                channel_name: channel.channel_name,
                                channel_image: channel.channel_image,
                                videos: videos
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err,
                                message: 'Something went wrong!'
                            });
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            message: 'Something went wrong!'
                        });
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong!'
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

var getVideosByChannelPagination = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                channelId = req.params.channelId;
                lastVideoId = req.params.lastVideoId;
                BroadcasterVideos.findAll({
                    where: {
                        broadcaster_channel_id: channelId,
                        id: {
                            $gt: lastVideoId
                        }
                    },
                    attributes: {
                        exclude: ['created_by', 'video_created_time', 'updated_by', 'video_updated_time']
                    }
                }).then(videos => {
                    res.status(200).json(videos);
                }).catch(err => {
                    console.log(err);
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
}

module.exports = {
    getBroadcastersVideos: getBroadcastersVideos,
    getBroadcastersVideosById: getBroadcastersVideosById,
    newVideo: newVideo,
    getVideosByChannel: getVideosByChannel,
    getVideosByChannelPagination: getVideosByChannelPagination
}