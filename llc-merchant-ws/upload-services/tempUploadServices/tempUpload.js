var multer = require('multer');
var awsImageUploadService = require('./../awsUploadServices/imageUploadService');

//multers disk storage settings

//multer settings

var fileUpload = function (req, res, id) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploadTemp/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, id + '-' +file.originalname.split('.')[file.originalname.split('.').length - 2] + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
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
        awsImageUploadService.uploadImages(req.file.path);
        res.json({ error_code: 0, err_desc: null });
    });
};

module.exports = {
    fileUpload: fileUpload
};