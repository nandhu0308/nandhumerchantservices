var BroadcasterVideos = require('./../broadcasterModels/broadcasterVideosModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');


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


module.exports = {
    getBroadcastersVideos:getBroadcastersVideos,
   getBroadcastersVideosById:getBroadcastersVideosById
}