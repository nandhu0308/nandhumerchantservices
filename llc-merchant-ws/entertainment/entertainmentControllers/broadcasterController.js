var Broadcaster = require('./../entertainmentModels/broadcasterModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newBroadcaster = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                Broadcaster.create({
                    user_id: reqObj.user_id,
                    broadcaster_name: reqObj.broadcaster_name,
                    description: reqObj.description,
                    short_description: reqObj.short_description,
                    broadcaster_thumbnail: reqObj.broadcaster_thumbnail,
                    broadcaster_banner: reqObj.broadcaster_banner,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(function(broadcaster){
                    res.status(200).json({
                        id: broadcaster.id,
                        message: 'success'
                    });
                }).catch(function(err){
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
    newBroadcaster: newBroadcaster
};