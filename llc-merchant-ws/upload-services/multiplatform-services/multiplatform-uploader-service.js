var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({ region: 'ap-south-1' });
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var google = require('googleapis');

var uploadVideo = function (req, res) {
    console.log('API works');
    var access_token = req.params.access_token;
    console.log(access_token);
    var s3_bucket = 'haappy-videos';
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
            cb(null, '101' + '-' + file.originalname.split('.')[file.originalname.split('.').length - 2] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
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
        uploadParams.Body = fileStream;
        uploadParams.Key = 'test/' + path.basename(file);
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            }
            if (data) {
                console.log(data.Location);
                console.log(req.file.size);
                var Youtube = google.youtube({
                    version: 'v3',
                    auth: access_token
                });
                //console.log(Youtube);
                Youtube.videos.insert({
                    resource: {
                        snippet: {
                            title: 'Testing Video 1',
                            description: 'Testing Video 1 Description'
                        },
                        status: {
                            privacyStatus: 'private'
                        }
                    },
                    part: 'snippet,status',
                    media: {
                        body: fileStream
                    }
                }, (yterr, ytdata) => {
                    if(yterr){
                        console.log(yterr);
                    } else {
                        console.log(ytdata);
                    }
                });
            }
        });
    });
};

module.exports = {
    uploadVideo: uploadVideo
};