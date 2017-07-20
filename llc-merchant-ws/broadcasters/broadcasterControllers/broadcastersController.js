var Broadcaster = require('./../broadcasterModels/broadcastersModel');
var BroadcasterVideos = require('./../broadcasterModels/broadcasterVideosModel');
var ChannelCategory = require('./../broadcasterModels/channelCategoryModel');

var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

Broadcaster.hasMany(ChannelCategory,{foreignKey: 'broadcaster_id' })
ChannelCategory.belongsTo(Broadcaster,{foreignKey: 'broadcaster_id' })

ChannelCategory.hasMany(BroadcasterVideos,{foreignKey: 'broadcaster_channel_id' })
BroadcasterVideos.belongsTo(ChannelCategory,{foreignKey: 'broadcaster_channel_id' })

//ChannelCategory.hasMany(BroadcasterVideos)

var getBroadcastersEGL = function (req, res) {
    
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
                            model: ChannelCategory ,
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




module.exports = {
    getBroadcastersEGL:getBroadcastersEGL
   
}