var UploadService = require('./../tempUploadServices/tempUpload');

var videoUpload = function(req, res){
    uploadApp = req.params.uploadApp;
    uploadTo = req.params.uploadTo;
    userId = req.params.userId;
    UploadService.fileUpload(req, res, uploadApp, uploadTo, userId);
};

module.exports = {
    videoUpload: videoUpload
};