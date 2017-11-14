var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({ region: 'ap-south-1' });
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var uploadVideoS3 = function (req, res) {
    console.log('API works');
    var broadcasterId = req.params.broadcasterId;
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
            cb(null, broadcasterId + '-' + file.originalname.split('.')[file.originalname.split('.').length - 2] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
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
        uploadParams.Key = 'fb/' + path.basename(file);
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            }
            if (data) {
                console.log(data);
                uploadSuccessResponse(req, res, data, req.file.size, fileName)
            }
        });
    });
};

var uploadSuccessResponse = function (req, res, data, fileSize, fileName) {
    res.status(200).json({
        message: 'success',
        videoUrl: data.Location,
        fileSize: fileSize,
        fileName: fileName
    });
}

module.exports = {
    uploadVideoS3: uploadVideoS3
};