var AWS = require('aws-sdk');
 AWS.config.loadFromPath('./config.json');
 var sqs = new AWS.SQS({region:'ap-south-1'}); 
 
//  var msg = { payload: 'a message' };

// var sqsParams = {
//   MessageBody: JSON.stringify(msg),
//   QueueUrl: 'QUEUE_URL'
// };

var sendMessage=function(sqsParams)
{
  sqs.sendMessage(sqsParams, function (err, data) {
    if (err) {
      console.log('ERR', err);
    }

    console.log(data);
  });
};



module.exports = {
    sendMessage: sendMessage
};