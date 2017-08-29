var sqsBroadcaster = require('./../awsQueueServices/sqsBroadcaster');

var sendMessage = function(req, res){
    sqsParams = req.params.sqsParams;
    sqsBroadcaster.sendMessage(sqsParams);
};



module.exports = {
    sendMessage: sendMessage
};