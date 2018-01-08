var BroadcasterDestination = require('./../broadcasterModels/broadcasterDestinationModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var createBroadcasterDestination = function (req, res) {
    reqObj = req.body;
    console.log(reqObj);
    console.log(BroadcasterDestination);
    BroadcasterDestination.findOne(
        {
            where:
                {
                    d_id: reqObj.d_id, broadcaster_channel_id: reqObj.broadcaster_channel_id,
                }

        }).then(broadcasterDestination => {
            console.log(broadcasterDestination);
            if (!broadcasterDestination) {
                console.log(broadcasterDestination);
                BroadcasterDestination.create({
                    d_id: reqObj.d_id,
                    broadcaster_id:reqObj.broadcaster_id,
                    destination_name: reqObj.destination_name,
                    description: reqObj.description,
                    broadcaster_channel_id: reqObj.broadcaster_channel_id,
                    is_active: reqObj.is_active
                }).then(destination => {
                    console.log(destination);
                    res.status(200).json({
                        id: destination.id,
                        message: "sucess"
                    })
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        message: "somthing went wrong"
                    })
                })
            }
            else {
                console.log("Already exists");
                res.status(409).json({
                    message: 'Already exists'
                })
            }
        })
        .catch(function (err) {
            res.status(500).json({
                message: "somthing went wrong"
            })

        })

};


var getDestinationImages = function (req, res) {

    channelId = req.params.channelId;
    destinationId = req.params.destinationId;
    BroadcasterDestination.findAll({
        where: {
            broadcaster_channel_id: channelId,
            // d_id:destinationId
        },
    }).then(destination => {
        res.status(200).json(destination);
    }).catch(err => {
        res.status(500).json({
            error: err,
            message: 'Something went wrong!'
        })
    });

}

var getAllDestination = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                BroadcasterDestination.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    // where: {
                    //     is_active: true
                    // }
                }).then(function (destinationAll) {
                    res.status(200).json(destinationAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'such destination not found...'
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

var updateDestination = function (req, res) {
    reqObj = req.body;
    console.log(req.body);
    console.log(reqObj.d_id);
    BroadcasterDestination.findOne({
        where:
            {
                d_id: reqObj.d_id,
                broadcaster_channel_id: reqObj.broadcaster_channel_id,
                is_active: true
            },
        attributes:
            {
                exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']

            }
    }).then(function (destinationUpdate) {
        if (destinationUpdate!=null) {
            destinationUpdate.updateAttributes({
                broadcaster_id:reqObj.broadcaster_id,
                d_id: reqObj.d_id,
                destination_name: reqObj.destination_name,
                description: reqObj.description,
                broadcaster_channel_id: reqObj.broadcaster_channel_id,
                is_active: reqObj.is_active
            }).then(function () {
                res.status(200).json(
                    {
                        id: destinationUpdate.id,
                        message: 'sucess'
                    });
            }).catch(function (err) {
                console.log(err);
                res.status(500).json({
                    error: err,
                    message: 'destination update failed...'
                });
            });
        }
        else {
            res.status(404).json({
                message: 'destination not found...'
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err,
            message: 'something went wrong...'
        });
    });

};

var getDestByBroadcasterDestinationId=function(req,res){
    Id = req.params.Id;
    BroadcasterDestination.findAll({
        attributes: {
            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
        },
        where: {
            id: Id
        }
    }).then(function (destination) {
        res.status(200).json(destination);
    }).catch(function (err) {
        res.status(404).json({
            message: 'No destination found...'
        });
    });
}




module.exports = {
    createBroadcasterDestination: createBroadcasterDestination,
    getDestinationImages: getDestinationImages,
    getAllDestination: getAllDestination,
    updateDestination: updateDestination,
    getDestByBroadcasterDestinationId : getDestByBroadcasterDestinationId

}
