var UploadService = require('./../tempUploadServices/tempUpload');

var videoUpload = function(req, res){
    console.log('video upload controller reached');
    uploadApp = req.params.uploadApp;
    uploadTo = req.params.uploadTo;
    userId = req.params.userId;
    UploadService.videoUpload(req, res, uploadApp, uploadTo, userId);
};

module.exports = {
    videoUpload: videoUpload
};