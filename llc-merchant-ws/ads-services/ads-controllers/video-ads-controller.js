var dateformat = require('dateformat');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
//var JSFTP = require('jsftp');
var Client = require('ftp');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({ region: 'ap-south-1' });
var VideoAds = require('./../ads-models/video_ads_model');

var newVideoAd = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                VideoAds.create({
                    broadcaster_id: reqObj.broadcaster_id,
                    channel_id: reqObj.channel_id,
                    ad_title: reqObj.ad_title,
                    ad_length: reqObj.ad_length,
                    video_url: reqObj.video_url,
                    ftp_path: reqObj.ftp_path,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(videoAd => {
                    console.log(videoAd);
                    res.status(200).json(videoAd);
                }).catch(err => {
                    res.status(500).json({
                        message: 'Something went wrong',
                        error: err
                    });
                });
            } else {
                res.status(401).json({
                    message: 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message: 'Token Expired...'
            });
        }
    }).catch(function (err) {
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var uploadVideoAd = function (req, res) {
    var appName = req.params.appName;
    //appName="ka-mob-prajaa";
    var ftpEndPointPath = '${com.wowza.wms.context.VHostConfigHome}/content/';
    var s3_bucket = 'haappy-images';
    var uploadParams = {
        Bucket: s3_bucket,
        Key: '',
        Body: '',
        ACL: 'public-read'
    };
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploadTemp/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname.split('.')[file.originalname.split('.').length - 2] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });
    var upload = multer({
        storage: storage
    }).single('file');
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        var filePathStr = req.file.path;
        var splitter = filePathStr.toString().split('\\');
        var fileName = splitter[1];
        var file = filePathStr;
        var fileStream = fs.createReadStream(file);
        var read_file = fs.readFile(file);
        fileStream.on('error', function (err) {
            console.log('File Error', err);
        });
        var client = new Client();
        var ftpConfig = {
            host: '52.77.123.79',
            port: 21,
            user: 'happyj-ftp',
            password: 'HappyApp'
        }
        client.connect(ftpConfig);
        uploadParams.Body = fileStream;
        uploadParams.Key = 'video_ads/' + path.basename(file);

        client.put(fileStream, './' + appName + '/' + fileName, function (ftpErr) {
            if (ftpErr) {
                console.log(ftpErr);
            } else {
                client.end();
                res.status(200).json({
                    message: 'success',
                    videoUrl: ftpEndPointPath + '/' + appName + '/' + fileName,
                    ftpPath: ftpEndPointPath + '/' + appName + '/' + fileName,
                    fileSize: req.file.size,
                    fileName: fileName
                });
            }
        });


        // s3.upload(uploadParams, function (err, data) {
        //     if (err) {
        //         console.log("Error", err);
        //     }
        //     if (data) {
        //         console.log(data);
        //         client.on('ready', function () {
        //             console.log("reached here...");
                    
        //         });
        //     }
        // });
    });
};

module.exports = {
    uploadVideoAd: uploadVideoAd,
    newVideoAd: newVideoAd
}