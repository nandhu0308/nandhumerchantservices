var LogoAds = require('./../ads-models/logo-ads-model');
var AdEvents = require('./../ads-models/ad-events-model');
var AssignLogoAds = require('./../ads-models/assign-logo-ads-model');
var dateformat = require('dateformat');
var Client = require('ftp');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var assignLogoAdEvents = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                var timestamp = Date.now();
                var eventName = reqObj.channel_id + '_event_' + timestamp;
                AdEvents.create({
                    channel_id: reqObj.channel_id,
                    event_name: eventName,
                    event_type: reqObj.event_type,
                    duration: reqObj.duration,
                    date: reqObj.date,
                    start_time: reqObj.start_time,
                    end_time: reqObj.end_time,
                    ad_window_time_pa: reqObj.ad_window_time_pa,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(adEvent => {
                    console.log(adEvent);
                    assignlogoAds = reqObj.logoAds;
                    assignlogoAds.forEach(function (i){
                        AssignLogoAds.create({
                            logo_ad_id: i.logo_ad_id,
                            ad_event_id: i.ad_event_id,
                            time_slot_start: i.time_slot_start,
                            time_slot_end: i.time_slot_end,
                            ad_placement: i.ad_placement,
                            ad_target: i.ad_target,
                            logo_ftp_path: i.logo_ftp_path,
                            img_name: i.img_name,
                            lower_text: i.lower_text,
                            created_by: i.created_by,
                            updated_by: i.updated_by
                        }).then(assings => {
                            console.log(assings);
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

module.exports = {
    assignLogoAdEvents: assignLogoAdEvents
}