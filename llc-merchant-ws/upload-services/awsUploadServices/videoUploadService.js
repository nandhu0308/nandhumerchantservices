var AWS = require('aws-sdk');

var displayBucket = function (req, res) {
    // Load the SDK for JavaScript
    //var AWS = require('aws-sdk');
    // Load credentials and set region from JSON file
    AWS.config.loadFromPath('./config.json');

    // Create S3 service object
    s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    // Call S3 to list current buckets
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket List", data.Buckets);
        }
    });
};

var uploadVideos = function(filepath, res, uploadApp, uploadTo, userId, fileName){
    var userFolder = "haappy-videos-asia";
    AWS.config.loadFromPath('./config.json');
    s3 = new AWS.S3();
    var uploadParams = {Bucket: userFolder, Key: '', Body: '', ACL:'public-read'};
    var file = filepath;
    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = uploadApp + '/' + uploadTo + '/' + userId + '/' + path.basename(file);
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            fs.unlinkSync(file);
            console.log("Error", err);
        } if (data) {
            fs.unlinkSync(file);
            afterVideoUpload(data.Location, fileName, "",res);
        }
    });
};

var afterVideoUpload = function(videoUrl, fileName, fileFormat, res){
    resObj = {
        videoUrl: videoUrl,
        fileName: fileName,
    };
    res.status(200).json(resObj);
};


var deleteVideoInS3 = function(req, res){
    reqObj = req.body;
    deleteApp = reqObj.deleteApp;
    deleteFrom = reqObj.deleteFrom;
    userId = reqObj.userId;
    fileName = reqObj.fileName;
    var userFolder = 'haappy-videos-asia';
    AWS.config.loadFromPath('./config.json');
    s3 = new AWS.S3();
    var deleteParams = {
        Bucket: userFolder,
        Key: deleteApp + '/' + deleteFrom + '/' + userId + '/' + fileName
    };
    s3.deleteObject(deleteParams, function(err, data){
        if(err){
            console.log("Error", err);
        } else if(data){
            console.log('deleted');
            console.log(data);
            res.status(200).json({
                message: 'video deleted successfully...'
            });
        }
    });
};

module.exports = {
    displayBucket: displayBucket,
    uploadVideos: uploadVideos,
    afterVideoUpload: afterVideoUpload,
    deleteVideoInS3:deleteVideoInS3
}