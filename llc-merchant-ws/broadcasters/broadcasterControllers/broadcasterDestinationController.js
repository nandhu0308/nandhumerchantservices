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
            d_id:reqObj.d_id,broadcaster_channel_id: reqObj.broadcaster_channel_id,
        }
     
    }).then(broadcasterDestination=>{
        console.log(broadcasterDestination);
        if(!broadcasterDestination){
            console.log(broadcasterDestination);
            BroadcasterDestination.create({
                d_id:reqObj.d_id,
                destination_name: reqObj.destination_name,
                description: reqObj.description,
                broadcaster_channel_id: reqObj.broadcaster_channel_id,
                is_active: reqObj.is_active
            }).then(destination=>{
                console.log(destination);
                res.status(200).json({
                    id:destination.id,
                    message:"sucess"
                })
            }).catch(function(err){
                console.log(err);
                res.status(500).json({
                    message:"somthing went wrong"
                })
            })
      }
      else{
        console.log("Already exists");
        res.status(409).json({
            message:'Already exists'
        })
      }
      }) 
        .catch(function(err){
            res.status(500).json({
                message:"somthing went wrong"
            })

        })

    };


    var getDestinationImages =function(req,res){

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

    

module.exports = {
    createBroadcasterDestination:createBroadcasterDestination,
    getDestinationImages : getDestinationImages

}
