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


var updateBroadcasterVideoYTStreamKey = function (req, res) {
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
                            yt_streamkey: reqObj.yt_streamkey,
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


var updateBroadcasterVideoFBStreamKey = function (req, res) {
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
                            fb_streamkey: reqObj.fb_streamkey,
                        }).then(function () {
                            res.status(200).json({
                                id: BroadcasterVideos.id,
                                fb_streamkey: BroadcasterVideos.fb_streamkey
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

var updateBroadcasterVideoHAStreamKey = function (req, res) {
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
                            ha_streamkey: reqObj.ha_streamkey,
                        }).then(function () {
                            res.status(200).json({
                                id: BroadcasterVideos.id,
                                ha_streamkey: BroadcasterVideos.ha_streamkey
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


//Create a broadcaster with channels automatically

var createBroadcasterwithChannel = function (req, res) {
    userAuthObj = JSON.parse(UserAuthServices.validateAuthentication(req));
    if (userAuthObj.authorize) {
        reqObj = req.body;
        return sequelize.transaction().then(function (t) {
            return Broadcaster.create({
                    rank: reqObj.rank,
                    broadcaster_name: reqObj.broadcaster_name,
                    broadcaster_channel_name: reqObj.broadcaster_channel_name,
                    broadcaster_email: reqObj.broadcaster_email,
                    broadcaster_description: reqObj.broadcaster_description,
                    broadcaster_website: reqObj.broadcaster_website,
                    broadcaster_image: reqObj.broadcaster_image,
                    broadcaster_tags: reqObj.broadcaster_tags,
                    broadcaster_total_videos: reqObj.broadcaster_total_videos,
                    server_pu_dns_name: reqObj.server_pu_dns_name,
                    server_pr_dns_name: reqObj.server_pr_dns_name,
                    mapped_domain_name: reqObj.mapped_domain_name,
                    w_application_name: reqObj.w_application_name,
                    primary_channel_id: reqObj.primary_channel_id,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
            }, { transaction: t }).then(function (broadcasterResults) {
                reqObjChannel=reqObj.broadcasterChannel;
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
        });
    }
};




module.exports = {
    getBroadcastersEGLById:getBroadcastersEGLById,
    getBroadcastersEGLAll:getBroadcastersEGLAll,
    getBroadcastersEGLByCategoryId:getBroadcastersEGLByCategoryId,
    updateBroadcasterVideoYTStreamKey:updateBroadcasterVideoYTStreamKey,
    updateBroadcasterVideoFBStreamKey:updateBroadcasterVideoFBStreamKey,
    updateBroadcasterVideoHAStreamKey:updateBroadcasterVideoHAStreamKey,
    getBroadcasterDestination:getBroadcasterDestination,
    createBroadcasterwithChannel:createBroadcasterwithChannel
   
}