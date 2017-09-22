var UploadService = require('./../tempUploadServices/tempUpload');
var AWSVideoUploadService = require('./../awsUploadServices/videoUploadService');

var videoUpload = function(req, res){
    console.log('video upload controller reached');
    uploadApp = req.params.uploadApp;
    uploadTo = req.params.uploadTo;
    userId = req.params.userId;
    UploadService.videoUpload(req, res, uploadApp, uploadTo, userId);
};

var videoUploadToS3 = function(req, res){
    reqBody = req.body;
    console.log(reqBody);
    AWSVideoUploadService.uploadVideos(reqBody.location, res, 'entertainment', 'content', reqBody.userId, reqBody.fileName);
}

var videoUploadQueue = function(req, res){
    debugger;
    console.log('video upload controller reached');
    queueParams = req.params.queueParams;
    
   
    //UploadService.videoUploadQueueDB(req, res, queueParams);
};

module.exports = {
    videoUpload: videoUpload,
    videoUploadToS3: videoUploadToS3,
    videoUploadQueue:videoUploadQueue
};