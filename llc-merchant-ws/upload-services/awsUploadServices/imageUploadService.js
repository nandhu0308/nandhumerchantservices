var AWS = require('aws-sdk');
var ProductCategory = require('./../../products/productModels/productCategoryModel');

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

var uploadImages = function (filepath, res, uploadApp, uploadTo, userId, fileName) {
    var userFolder = 'limitlesscircle-images';
    //console.log(userFolder);
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
    uploadParams.Key = uploadApp + '/' + uploadTo + '/' + userId + '/' + path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            fs.unlinkSync(file);
            console.log("Error", err);
        } if (data) {
            fs.unlinkSync(file);
            updateCategoryImageUrl(data.Location, fileName, res);
        }
    });
};

var deleteImage = function(req, res){
    reqObj = req.body;
    deleteApp = reqObj.deleteApp;
    deleteFrom = reqObj.deleteFrom;
    userId = reqObj.userId;
    fileName = reqObj.fileName;
    var userFolder = 'limitlesscircle-images';
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
                message: 'image deleted successfully...'
            });
        }
    });
};

var updateCategoryImageUrl = function (imageUrl, fileName, res) {
    if (imageUrl) {
        if (imageUrl != '' || imageUrl != ' ') {
            

            res.status(200).send(imageUrl + '|' + fileName);
        } else {
            res.status(500).json({
                message: 'image upload not success'
            });
        }
    } else {
        res.status(500).json({
            message: 'image upload not success'
        });
    }
};

module.exports= {
    displayBucket: displayBucket,
    uploadImages: uploadImages,
    updateCategoryImageUrl: updateCategoryImageUrl,
    deleteImage: deleteImage
}