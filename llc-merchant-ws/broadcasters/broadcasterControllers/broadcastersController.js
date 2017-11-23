
var Broadcaster = require('./../broadcasterModels/broadcastersModel');
var BroadcasterVideos = require('./../broadcasterModels/broadcasterVideosModel');
var BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');
var BroadcasterChannelCategory = require('./../broadcasterModels/broadcasterChannelCategoryModel');
var BroadcasterChannelDestination = require('./../broadcasterModels/broadcasterDestinationModel');

var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

Broadcaster.hasMany(BroadcasterChannel, { foreignKey: 'broadcaster_id' })
BroadcasterChannel.belongsTo(Broadcaster, { foreignKey: 'broadcaster_id' })
BroadcasterChannel.hasMany(BroadcasterVideos, { foreignKey: 'broadcaster_channel_id' })
BroadcasterVideos.belongsTo(BroadcasterChannel, { foreignKey: 'broadcaster_channel_id' })

var getBroadcasterCategory = function (req, res) {

    authToken = req.headers.authorization;

    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                BroadcasterChannelCategory.findAll({
                    where: {
                        is_active: true
                    }
                }
                ).then(function (broadcasterChannelCategory) {
                    res.status(200).json(broadcasterChannelCategory);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No broadcasters category  found...'
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
var getBroadcasterDestination = function (req, res) {

    authToken = req.headers.authorization;

    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                //var b_channelid=req.params.channelid;
                BroadcasterChannelDestination.findAll({
                    where: {
                        is_active: true
                        //broadcaster_channel_id:b_channelid
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

var getBroadcasterChannelDestination = function (req, res) {

    authToken = req.headers.authorization;

    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                var b_channelid=req.params.channelid;
                BroadcasterChannelDestination.findAll({
                    where: {
                        is_active: true,
                        broadcaster_channel_id:b_channelid
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
                        model: BroadcasterChannel,



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
                channelCategory_id = req.params.ccategoryId;
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
                        model: BroadcasterChannel,

                        where: {
                            id: channelCategory_id
                        },
                        include: [{
                            attributes: {
                                exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                            },
                            model: BroadcasterVideos,
                    
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
                        model: BroadcasterChannel,
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
                            yt_start_time:todayDate,
                            yt_start_count:BroadcasterVideos.yt_start_count+1,
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
                            fb_start_time:todayDate,
                            fb_start_count:BroadcasterVideos.fb_start_count+1,
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

var updateBroadcasterVideoPSStreamKey = function (req, res) {
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
                            ps_streamkey: reqObj.ps_streamkey,
                            ps_start_time:todayDate,
                            ps_start_count:BroadcasterVideos.ps_start_count+1,
                        }).then(function () {
                            res.status(200).json({
                                id: BroadcasterVideos.id,
                                ps_streamkey: BroadcasterVideos.ps_streamkey
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

    //authorize = UserAuthServices.validateAuthentication(req);
    var reqObjChannel;
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;

                if (reqObj.length > 0) {
                    reqBroadcasterObj = reqObj[0];
                    if (reqObj[0].broadcaster_channels.length > 0) {
                        reqObjChannel = reqObj[0].broadcaster_channels[0];
                    }

                    sequelize.transaction().then(function (t) {
                        Broadcaster.create({
                            rank: reqBroadcasterObj.rank,
                            broadcaster_name: reqBroadcasterObj.broadcaster_name,
                            broadcaster_channel_name: reqBroadcasterObj.broadcaster_channel_name,
                            broadcaster_email: reqBroadcasterObj.broadcaster_email,
                            broadcaster_description: reqBroadcasterObj.broadcaster_description,
                            broadcaster_website: reqBroadcasterObj.broadcaster_website,
                            broadcaster_image: reqBroadcasterObj.broadcaster_image,
                            broadcaster_tags: reqBroadcasterObj.broadcaster_tags,
                            broadcaster_total_videos: reqBroadcasterObj.broadcaster_total_videos,
                            server_pu_dns_name: reqBroadcasterObj.server_pu_dns_name,
                            server_pr_dns_name: reqBroadcasterObj.server_pr_dns_name,
                            mapped_domain_name: reqBroadcasterObj.mapped_domain_name,
                            w_application_name: reqBroadcasterObj.w_application_name,
                            primary_channel_id: reqBroadcasterObj.primary_channel_id,
                            w_get_target_url:reqBroadcasterObj.w_get_target_url,
                            is_active: reqBroadcasterObj.is_active,
                            created_by: reqBroadcasterObj.created_by,
                            updated_by: reqBroadcasterObj.updated_by
                        }, { transaction: t }).then(function (broadcasterResults) {
                            BroadcasterChannel.create({
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
                            t.commit();
                        }).catch(function (err) {
                            t.rollback();
                        });
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
var newBroadcasterwithChannel = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                if (reqObj) {
                    reqBroadcasterObj = reqObj;
                    if (reqObj.broadcaster_channels) {
                        reqObjChannel = reqObj.broadcaster_channels;
                        broadcasterVideos = reqObj.broadcaster_videos;
                    }
                    Broadcaster.create({
                        rank: reqBroadcasterObj.rank,
                        broadcaster_name: reqBroadcasterObj.broadcaster_name,
                        broadcaster_channel_name: reqBroadcasterObj.broadcaster_channel_name,
                        broadcaster_email: reqBroadcasterObj.broadcaster_email,
                        broadcaster_description: reqBroadcasterObj.broadcaster_description,
                        broadcaster_website: reqBroadcasterObj.broadcaster_website,
                        broadcaster_image: reqBroadcasterObj.broadcaster_image,
                        broadcaster_tags: reqBroadcasterObj.broadcaster_tags,
                        broadcaster_total_videos: 0,
                        category_id:reqBroadcasterObj.category_id,
                        seller_id:reqBroadcasterObj.seller_id,
                        broadcaster_loc_latitude: reqBroadcasterObj.broadcaster_loc_latitude,
                        broadcaster_loc_latitude: reqBroadcasterObj.broadcaster_loc_latitude,
                        broadcaster_loc_longitude: reqBroadcasterObj.broadcaster_loc_longitude,
                        broadcast_kyc_doc_type: reqBroadcasterObj.broadcast_kyc_doc_type,
                        broadcast_kyc_doc_value: reqBroadcasterObj.broadcast_kyc_doc_value,
                        server_pu_dns_name: reqBroadcasterObj.server_pu_dns_name,
                        server_pr_dns_name: reqBroadcasterObj.server_pr_dns_name,
                        mapped_domain_name: reqBroadcasterObj.mapped_domain_name,
                        w_application_name: reqBroadcasterObj.w_application_name,
                        primary_channel_id: reqBroadcasterObj.primary_channel_id,
                        is_active: reqBroadcasterObj.is_active,
                        created_by: reqBroadcasterObj.created_by,
                        updated_by: reqBroadcasterObj.updated_by
                    }).then(function (broadcasterResults) {
                        BroadcasterChannel.create({
                            application_id: reqObjChannel.application_id,
                            broadcaster_id: broadcasterResults.id,
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
                            updated_by: reqObjChannel.updated_by,
                            lang_id:reqObjChannel.lang_id,
                            is_hd:reqObjChannel.is_hd,
                            ha_rank:reqObjChannel.ha_rank,
                            ha_is_active:reqObjChannel.ha_is_active,
                            deprecated:reqObjChannel.deprecated,
                        }).then(function (broadcasterChannelResults) {
                            BroadcasterVideos.create({
                                broadcaster_channel_id: broadcasterChannelResults.id,
                                language_id:broadcasterVideos.language_id,
                                video_name: broadcasterVideos.video_name,
                                rank: broadcasterVideos.rank,
                                video_thumbnail: broadcasterVideos.video_thumbnail,
                                video_description: broadcasterChannelResults.channel_name,
                                url: broadcasterVideos.url,
                                duration:broadcasterVideos.duration,
                                is_primary:broadcasterVideos.is_primary,
                                is_active: broadcasterVideos.is_active,
                                is_youtube: broadcasterVideos.is_youtube,
                                is_live: broadcasterVideos.is_live,
                                live_ads: broadcasterVideos.live_ads,
                                p160: broadcasterVideos.p160,
                                p360: broadcasterVideos.p360,
                                p720: broadcasterVideos.p720,
                                p1080: broadcasterVideos.p1080,
                                p_uhd: broadcasterVideos.p_uhd,
                                video_type: broadcasterVideos.video_type,
                                yt_streamkey: broadcasterVideos.yt_streamkey,
                                fb_streamkey: broadcasterVideos.fb_streamkey,
                                ha_streamkey: broadcasterVideos.ha_streamkey,
                                created_by: broadcasterVideos.created_by,
                                updated_by: broadcasterVideos.updated_by,
                                ps_streamkey:broadcasterVideos.ps_streamkey,
                                fp_start_time:broadcasterVideos.fb_start_time,
                                ps_start_time:broadcasterVideos.ps_start_time,
                                yt_start_time:broadcasterVideos.yt_start_time,
                                ps_stop_time:broadcasterVideos.ps_stop_time,
                                fb_stop_time:broadcasterVideos.fb_stop_time,
                                yt_stop_time:broadcasterVideos.fb_stop_time,
                                
                            }).then(function (broadcasterVideoResults) {
                                

                                //update broadcaster with primary channel ID

                                Broadcaster.findById(broadcasterResults.id).then(function (Broadcaster) {
                                    
                                    if (Broadcaster) {
                                        Broadcaster.updateAttributes({
                                            primary_channel_id: broadcasterVideoResults.broadcaster_channel_id,
                                        }).then(function () {
                                            res.status(200).json({
                                                id: broadcasterVideoResults.id,
                                                video_url: broadcasterVideoResults.video_url
                                            });
                                        }).catch(function (err) {
                                            console.log(err)
                                            res.status(500).json({
                                                message: 'Broadcaster update failed...'
                                            });
                                        });
                                    } else {
                                        res.status(404).json({
                                            message: 'Broadcaster not found...'
                                        });
                                    }
                                }).catch(function (err) {
                                    res.status(500).json({
                                        message: 'something went wrong...'
                                    });
                                });


                            }).catch(function (err) {
                                console.log(err);
                                res.status(500).json({
                                    errMessage: err,
                                    message: 'creating new broadcaster video failed...'
                                });
                            });

                        }).catch(function (err) {
                            console.log(err);
                            res.status(500).json({
                                errMessage: err,
                                message: 'creating new broadcaster channel failed...'
                            });
                        });


                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).json({
                            errMessage: err,
                            message: 'creating new broadcaster failed...'
                        });
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


var getBroadcasterOnBoardGrid=function(req,res){
    authToken = req.headers.authorization;

    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                Broadcaster.findAll({
                    where: {
                        is_active: true
                    }
                }
                ).then(function (broadcasterAll) {
                    
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
module.exports = {
    getBroadcastersEGLById: getBroadcastersEGLById,
    getBroadcastersEGLAll: getBroadcastersEGLAll,
    getBroadcastersEGLByCategoryId: getBroadcastersEGLByCategoryId,
    updateBroadcasterVideoYTStreamKey: updateBroadcasterVideoYTStreamKey,
    updateBroadcasterVideoFBStreamKey: updateBroadcasterVideoFBStreamKey,
    updateBroadcasterVideoHAStreamKey: updateBroadcasterVideoHAStreamKey,
    getBroadcasterDestination: getBroadcasterDestination,
    getBroadcasterChannelDestination:getBroadcasterChannelDestination,
    createBroadcasterwithChannel: createBroadcasterwithChannel,
    newBroadcasterwithChannel: newBroadcasterwithChannel,
    getBroadcasterCategory: getBroadcasterCategory,
    updateBroadcasterVideoPSStreamKey: updateBroadcasterVideoPSStreamKey

}