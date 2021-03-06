var AWS = require('aws-sdk');
var BroadcasterVideos = require('./../../broadcasters/broadcasterModels/broadcasterVideosModel');
var sqsBroadcaster = require('./../awsQueueServices/sqsBroadcaster');

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

var uploadVideos = function (filepath, res, uploadApp, uploadTo, userId, fileName) {
    var userFolder = "haappy-videos-asia";
    AWS.config.loadFromPath('./config.json');
    s3 = new AWS.S3();
    var uploadParams = { Bucket: userFolder, Key: '', Body: '', ACL: 'public-read' };
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
            afterVideoUpload(data.Location, fileName, filepath, res);
        }
    });
};

var afterVideoUpload = function (videoUrl, fileName, filepath, res) {
    BroadcasterVideos.findOne({
        where: {
            url: filepath
           
        }
    }).then(video => {
        video.updateAttributes({
            url: videoUrl,
             upload_status:"Success",
            is_active:true
        }).then(function () {
            res.status(200).json(video);
        }).catch(function (err) {
            console.log('update err: '+err);
            res.status(500).json({
                error: err,
                message: 'something went wrong'
            });
        });
    }).catch(function (err) {
        console.log('retrieve err: '+err);
        res.status(500).json({
            error: err,
            message: 'something went wrong'
        });
    });
};


var videoUploadCreatewithQueue = function (req, res,queueParams,queueBody) {
    BroadcasterVideos.create({
    broadcaster_channel_id: queueParams.channel_id,
    language_id:queueParams.language_id,
    video_name: queueParams.video_name,
    rank: queueParams.rank,
    video_thumbnail: "",
    video_description: queueParams.video_description,
    url: queueParams.url,
    duration:0,
    is_primary:true,
    is_active: false,
    is_youtube: false,
    is_live: false,
    live_ads: false,
    p160: false,
    p360: false,
    p720: false,
    p1080:false,
    p_uhd: false,
    video_type: 'MP4',
    yt_streamkey: 'xxxx-xxxx-xxxx-xxxx',
    fb_streamkey: 'xxxx-xxxx-xxxx-xxxx',
    ha_streamkey: 'xxxx-xxxx-xxxx-xxxx',
    created_by: videoItem.userName,
    updated_by: videoItem.userName
    }).then(video => {
          sqsBroadcaster.sendMessage(queueBody);
         res.status(200).json(video);        
    }).catch(function (err) {
        console.log('retrieve err: '+err);
        res.status(500).json({
            error: err,
            message: 'something went wrong'
        });
    });
};


var deleteVideoInS3 = function (req, res) {
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
    s3.deleteObject(deleteParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else if (data) {
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
    deleteVideoInS3: deleteVideoInS3,
    videoUploadCreatewithQueue:videoUploadCreatewithQueue
}