var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({ region: 'ap-south-1' });
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var Youtube = require('youtube-video-api');
var google_auth = require('google-cli-auth');

var youtube = Youtube({
    video: {
        part: 'status,snippet'
    },
    email: 'developer.limitlesscircle@gmail.com',
    password: 'H@appy$99'
});

var uploadVideo = function (req, res) {
    console.log('API works');
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
            } if (data) {
                console.log(data.Location);
                console.log(req.file.size);

                var params = {
                    resource: {
                        snippet: {
                            title: 'test video',
                            description: 'This is a test video uploaded via the YouTube API'
                        },
                        status: {
                            privacyStatus: 'private'
                        }
                    }
                };

                require('google-cli-auth')({
                    name: 'yt-upload-client',
                    client_id: '541496688190-3047k21qs4r9t266jvpca9rf5sssos91.apps.googleusercontent.com',
                    client_secret: 'NdXsmSIxaBjSDDjCIr2AD_8I',
                    scope: [
                        'https://www.googleapis.com/auth/youtube.upload'
                    ]
                }, function (gaerr, token) {
                    console.log(token);
                    youtube.authenticate('541496688190-3047k21qs4r9t266jvpca9rf5sssos91.apps.googleusercontent.com', 'NdXsmSIxaBjSDDjCIr2AD_8I', token, function (aerr, token) {
                        if (aerr) {
                            console.log(aerr);
                        } else {
                            console.log(token);
                            youtube.insert(file, params, function (yterr, video) {
                                if (yterr) {
                                    console.log(yterr);
                                } else {
                                    console.log(video);
                                }
                            });
                        }
                    });
                });
            }
        });
    });
};

module.exports = {
    uploadVideo: uploadVideo
};