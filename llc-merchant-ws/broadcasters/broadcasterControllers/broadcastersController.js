var Broadcaster = require('./../broadcasterModels/broadcastersModel');
var BroadcasterVideos = require('./../broadcasterModels/broadcasterVideosModel');
var BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');
var BroadcasterChannelCategory = require('./../broadcasterModels/broadcasterChannelCategoryModel');
var BroadcasterChannelDestination = require('./../broadcasterModels/broadcasterDestinationModel');

var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

Broadcaster.hasMany(BroadcasterChannel,{foreignKey: 'broadcaster_id' })
BroadcasterChannel.belongsTo(Broadcaster,{foreignKey: 'broadcaster_id' })
BroadcasterChannel.hasMany(BroadcasterVideos,{foreignKey: 'broadcaster_channel_id' })
BroadcasterVideos.belongsTo(BroadcasterChannel,{foreignKey: 'broadcaster_channel_id' })

var getBroadcasterDestination = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               
                BroadcasterChannelDestination.findAll({
                    where: {
                        is_active: true
                    }
                    
                     }
                
                ).then(function (broadcastersDestination) {
                    res.status(200).json(broadcastersDestination);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters Destination  found...'
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


var getBroadcastersEGLById = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               broadcaster_id = req.params.id;
               
                Broadcaster.findAll({
                     attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        id: broadcaster_id
                    }
                    ,
                        include: [{
                            attributes: {
                            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            },
                            model: BroadcasterChannel ,

                            

                            include: [{
                                attributes: {
                                    exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                                },
                            model: BroadcasterVideos
                         }]                        
                        }]
                     }
                
                ).then(function (broadcastersByid) {
                    res.status(200).json(broadcastersByid);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters  found...'
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


var getBroadcastersEGLByCategoryId = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               broadcaster_id = req.params.id;
               channelCategory_id=req.params.ccategoryId;
                Broadcaster.findAll({
                     attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        id: broadcaster_id
                    }
                    ,
                        include: [{
                            attributes: {
                            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            },
                            model: BroadcasterChannel ,
                            
                    where: {
                        id: channelCategory_id
                    },
                            include: [{
                                attributes: {
                                    exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                                },
                            model: BroadcasterVideos
                         }]                        
                        }]
                     }
                
                ).then(function (broadcastersByid) {
                    res.status(200).json(broadcastersByid);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters  found...'
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

var getBroadcastersEGLAll = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               
                Broadcaster.findAll({
                     attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                     }
                    ,
                    where: {
                        is_active: true
                    }
                    ,
                        include: [{
                            attributes: {
                            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            },
                            model: BroadcasterChannel ,
                            include: [{
                                attributes: {
                                    exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                                },
                            model: BroadcasterVideos
                         }]                        
                        }]
                     }
                
                ).then(function (broadcastersAll) {
                    res.status(200).json(broadcastersAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters  found...'
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


var updateBroadcasterVideoStreamKey = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                BroadcasterVideos.findById(reqObj.id).then(function (BroadcasterVideos) {
                    if (BroadcasterVideos) {
                        BroadcasterVideos.updateAttributes({
                            yt_streamkey: reqObj.yt_streamkey
                        }).then(function () {
                            res.status(200).json({
                                id: BroadcasterVideos.id,
                                yt_streamkey: BroadcasterVideos.yt_streamkey
                            });
                        }).catch(function (err) {
                            console.log(err)
                            res.status(500).json({
                                message: 'BroadcasterVideos update failed...'
                            });
                        });
                    } else {
                        res.status(404).json({
                            message: 'BroadcasterVideos not found...'
                        });
                    }
                }).catch(function (err) {
                    res.status(500).json({
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};






module.exports = {
    getBroadcastersEGLById:getBroadcastersEGLById,
    getBroadcastersEGLAll:getBroadcastersEGLAll,
    getBroadcastersEGLByCategoryId:getBroadcastersEGLByCategoryId,
    updateBroadcasterVideoStreamKey:updateBroadcasterVideoStreamKey,
    getBroadcasterDestination:getBroadcasterDestination
   
}