var multer = require('multer');
var awsImageUploadService = require('./../awsUploadServices/imageUploadService');

//multers disk storage settings

//multer settings

var fileUpload = function (req, res, uploadApp, uploadTo, userId) {
    var imageUrl="";
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploadTemp/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, userId + '-' +file.originalname.split('.')[file.originalname.split('.').length - 2] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });

    var upload = multer({
        storage: storage
    }).single('file');

    upload(req, res, function (err) {
        console.log(req.file.path);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        var filePathStr = req.file.path;
        var splitter = filePathStr.toString().split('\\');
        var fileName = splitter[1];
        imageUrl = awsImageUploadService.uploadImages(req.file.path, res, uploadApp, uploadTo, userId, fileName);
        //res.json({ error_code: 0, err_desc: null });
    });
};

module.exports = {
    fileUpload: fileUpload
};