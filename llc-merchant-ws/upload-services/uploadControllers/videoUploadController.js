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

module.exports = {
    videoUpload: videoUpload,
    videoUploadToS3: videoUploadToS3
};