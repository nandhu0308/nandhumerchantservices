var BroadcasterAlbum = require('./../entertainmentModels/broadcasterAlbumsModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newAlbum = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                BroadcasterAlbum.create({
                    broadcaster_id: reqObj.broadcaster_id,
                    category_id: reqObj.category_id,
                    language_id: reqObj.language_id,
                    album_name: reqObj.album_name,
                    album_description: reqObj.album_description,
                    album_thumbnail: reqObj.album_thumbnail,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(function (album) {
                    res.status(200).json({
                        id: album.id,
                        message: 'success'
                    });
                }).catch(function (err) {
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
    newAlbum: newAlbum
};