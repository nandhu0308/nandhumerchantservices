var Applications = require('./../applicationsModels/applicationsModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newAplication = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                Applications.create({
                    application_name: reqObj.application_name,
                    application_short_name: reqObj.application_short_name,
                    description: reqObj.description,
                    is_active: reqObj.is_active,
                    created_by: reqObj.created_by,
                    last_updated_by: reqObj.last_updated_by
                }).then(application => {
                    res.status(200).json({
                        application_id: application.id,
                        message: 'success'
                    });
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'Couldnt create application. Something went wrong...',
                        err_description: err
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

module.exports = {
    newAplication: newAplication
}