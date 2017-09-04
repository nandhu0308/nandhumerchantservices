var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var sqs = new AWS.SQS({region:'ap-south-1'}); 

var sendMessage = function(sqsParams)
{
  sqs.sendMessage(sqsParams, function (err, data) {
    if (err) {
      console.log('ERR', err);
    } else {
      console.log(data);
    }
  });
};

var receiveMessage = function(sqsParam){
  sqs.receiveMessage(sqsParam, function(err, data){
    if(err){
      console.log(err);
    } else {
      console.log(data);
      //console.log(JSON.parse(data));
    }
  });
};

var deleteMessage = function(sqsParam){
  sqs.purgeQueue(sqsParam, function(err, data){
    if(err){
      console.log(err);
    } else {  
      console.log(data);
      console.log(JSON.parse(data.Messages[0].MessageAttributes));
    }
  });
};

module.exports = {
    sendMessage: sendMessage,
    receiveMessage: receiveMessage,
    deleteMessage: deleteMessage
};