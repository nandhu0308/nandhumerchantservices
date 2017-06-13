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

var uploadImages = function (filepath) {
    var userFolder = 'limitlesscircle-images' + '/' + '369';
    // Create S3 service object
    AWS.config.loadFromPath('./config.json');
    s3 = new AWS.S3();

    // call S3 to retrieve upload file to specified bucket
    var uploadParams = {Bucket: userFolder, Key: '', Body: '', ACL:'public-read'};
    var file = filepath;

    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    var path = require('path');
    uploadParams.Key = path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
        console.log(uploadParams);
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log(data);
            console.log("Upload Success", data.Location);
        }
    });
};

module.exports= {
    displayBucket: displayBucket,
    uploadImages: uploadImages
}