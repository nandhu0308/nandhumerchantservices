var LogoAds = require('./../ads-models/logo-ads-model');
var AdEvents = require('./../ads-models/ad-events-model');
var AssignLogoAds = require('./../ads-models/assign-logo-ads-model');
var dateformat = require('dateformat');
var Client = require('ftp');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var VideoAds = require('./../ads-models/video-ad-event');
var AssignVideoAds = require('./../ads-models/assign-video-ads');
var VideoAdEvent = require('./../ads-models/video-ad-event');

var assignLogoAdEvents = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                console.log(reqObj);
                var timestamp = Date.now();
                var eventName = reqObj.channel_id + '_event_' + timestamp;
                AdEvents.create({
                    channel_id: reqObj.channel_id,
                    event_name: reqObj.event_name,
                    event_type: reqObj.event_type,
                    ad_type: reqObj.ad_type,
                    duration: reqObj.duration,
                    date: reqObj.date,
                    start_time: reqObj.start_time,
                    end_time: reqObj.end_time,
                    ad_window_time_pa: reqObj.ad_window_time_pa,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(adEvent => {
                    assignlogoAds = reqObj.assignLogoAds;
                    assignlogoAds.forEach(function (i) {
                        AssignLogoAds.create({
                            logo_ad_id: i.logo_ad_id,
                            ad_event_id: adEvent.id,
                            time_slot_start: i.time_slot_start,
                            time_slot_end: i.time_slot_end,
                            ad_placement: i.ad_placement,
                            ad_target: i.ad_target,
                            stream_source: i.ad_target == "Youtube" ? "Source" : "720p",
                            logo_ftp_path: i.logo_ftp_path,
                            img_name: i.img_name,
                            lower_text: i.lower_text,
                            created_by: i.created_by,
                            updated_by: i.updated_by,
                            geo_x_coordinate: i.geo_x_coordinate,
                            geo_y_coordinate: i.geo_y_coordinate,
                            ad_type: i.ad_type,
                            txt_pos_top:i.txt_pos_top,
                            txt_pos_bottom:i.txt_pos_bottom,
                            txt_pos_left:i.txt_pos_left,
                            txt_pos_right:i.txt_pos_right
                        }).then(assigns => {
                            console.log(assigns.id);
                        }).catch(err => {
                            console.log(err);
                        })
                    });
                    res.status(200).json({
                        id: adEvent.id,
                        message: 'success'
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'something went wrong',
                        error: error
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

var assignVideoAdsEvents = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                VideoAdEvent.create({
                    channel_id: reqObj.channel_id,
                    event_name: reqObj.event_name,
                    date: reqObj.date,
                    no_of_ads: reqObj.no_of_ads,
                    start_time: reqObj.start_time,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(AdEvent => {
                    assignlogoAds = reqObj.assignLogoAds;
                    assignVideoAds.forEach(function (i) {
                        AssignVideoAds.create({
                            video_ad_event_id: videoAdEvent.id,
                            video_ad_id: i.video_ad_id,
                            ad_length: i.ad_length,
                            ad_target: i.ad_target,
                            video_ftp_path: i.video_ftp_path,
                            video_name: i.video_name,
                            created_by: i.created_by,
                            updated_by: i.updated_by
                        }).then(assign => {
                            console.log(assign.id);
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({
                                message: 'Something went wrong',
                                error: err
                            });
                        });
                    });
                    res.status(200).json({
                        id: videoAdEvent.id,
                        message: 'Success'
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'Something went wrong',
                        error: err
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

<<<<<<< HEAD
var getAdEventsByDate = function (req, res) {
=======
var assignLogoAdEventsWithTrans = function (req, res) {
>>>>>>> 58225ff60e772834b2ba42b2092cad92016e0764
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
<<<<<<< HEAD
                channelId = req.params.channelId;
                eventDate = req.params.eventDate;
                AdEvents.findAll({
                    where: {
                        channel_id: channelId,
                        date: eventDate
                    },
                    attributes: {
                        exclude: ['created_on', 'updated_on']
                    }
                }).then(adEvents => {
                    res.status(200).json(adEvents);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong'
                    });
                });
=======
                reqObj = req.body;
                console.log(reqObj);
                var timestamp = Date.now();
                var eventName = reqObj.channel_id + '_event_' + timestamp;
                return sequelize.transaction().then(function (t) {
                    return AdEvents.create({
                        channel_id: reqObj.channel_id,
                        event_name: reqObj.event_name,
                        event_type: reqObj.event_type,
                        ad_type: reqObj.ad_type,
                        duration: reqObj.duration,
                        date: reqObj.date,
                        start_time: reqObj.start_time,
                        end_time: reqObj.end_time,
                        ad_window_time_pa: reqObj.ad_window_time_pa,
                        is_active: reqObj.is_active,
                        created_by: reqObj.created_by,
                        updated_by: reqObj.updated_by
                    }, {transaction: t}).then(function (adEvent) {
                        assignlogoAds = reqObj.assignLogoAds;
                        assignlogoAds.forEach(function (i) {
                            return AssignLogoAds.create({
                                logo_ad_id: i.logo_ad_id,
                                ad_event_id: adEvent.id,
                                time_slot_start: i.time_slot_start,
                                time_slot_end: i.time_slot_end,
                                ad_placement: i.ad_placement,
                                ad_target: i.ad_target,
                                stream_source: i.ad_target == "Youtube" ? "Source" : "720p",
                                logo_ftp_path: i.logo_ftp_path,
                                img_name: i.img_name,
                                lower_text: i.lower_text,
                                created_by: i.created_by,
                                updated_by: i.updated_by,
                                geo_x_coordinate: i.geo_x_coordinate,
                                geo_y_coordinate: i.geo_y_coordinate,
                                ad_type: i.ad_type,
                                txt_pos_top:i.txt_pos_top,
                                txt_pos_bottom:i.txt_pos_bottom,
                                txt_pos_left:i.txt_pos_left,
                                txt_pos_right:i.txt_pos_right
                               }, {transaction: t});
                             }).then(function () {
                               return t.commit();
                             }).catch(function (err) {
                               return t.rollback();
                             });
                        });
                      
                  });
>>>>>>> 58225ff60e772834b2ba42b2092cad92016e0764
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
<<<<<<< HEAD
        console.log(err);
=======
>>>>>>> 58225ff60e772834b2ba42b2092cad92016e0764
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

<<<<<<< HEAD

module.exports = {
    assignLogoAdEvents: assignLogoAdEvents,
    assignVideoAdsEvents: assignVideoAdsEvents,
    getAdEventsByDate: getAdEventsByDate
=======
module.exports = {
    assignLogoAdEvents: assignLogoAdEvents,
    assignVideoAdsEvents: assignVideoAdsEvents,
    assignLogoAdEventsWithTrans:assignLogoAdEventsWithTrans
>>>>>>> 58225ff60e772834b2ba42b2092cad92016e0764
}