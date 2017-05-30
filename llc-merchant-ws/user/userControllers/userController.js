var dateformat = require('dateformat');
var ApplicationUsers = require('./../userModels/applicationUsersModel');
var userAuthServices = require('./../../util-services/sessions-services/userAuthServices');

var newUserRegistration = function (req, res) {
    reqObj = req.body;
    ApplicationUsers.create({
        application_id: reqObj.application_id,
        user_type: reqObj.user_type,
        seller_id: reqObj.seller_id,
        user_name: reqObj.user_name,
        user_short_name: reqObj.user_short_name,
        country: reqObj.country,
        city: reqObj.city,
        zip: reqObj.zip,
        country_iso_code: reqObj.country_iso_code,
        device_mac: reqObj.device_mac,
        mobile: reqObj.mobile,
        email_id: reqObj.email_id,
        passwd: reqObj.passwd,
        is_anonymous: reqObj.is_anonymous,
        is_active: reqObj.is_active,
        created_by: reqObj.created_by,
        last_updated_by: reqObj.last_updated_by
    }).then(newUser => {
        res.status(200).json({
            user_id: newUser.id,
            message: 'success'
        });
    }).catch(function (err) {
        res.status(500).json({
            errMessage: err,
            message: 'something went wrong...'
        });
    });
};

var userLogin = function (req, res) {
    reqObj = req.body;
    ApplicationUsers.findOne({
        where: {
            email_id: reqObj.email_id,
            passwd: reqObj.passwd
        },
        attributes: {
            exclude: ['created_by', 'created_on', 'last_updated_by', 'last_updated_on', 'passwd']
        }
    }).then(user => {
        if (user === null) {
            res.status(404).json({
                message: 'User Not Found/Check Login Credentials'
            });
        } else {
            var date = new Date();
            var todayDate = dateformat(date, "yyyy-mm-dd");
            var expireDate = dateformat(date.setTime( date.getTime() + 7 * 86400000 ), "yyyy-mm-dd");
            var userAuthParamObj = {
                user_id: user.id,
                user_mail: user.email_id,
                created_date: todayDate,
                expire_date: expireDate
            }
            var authToken = userAuthServices.userAuthToken(JSON.stringify(userAuthParamObj));
            console.log(authToken);
            res.status(200).json({
                user_id: user.id,
                user_app_id: user.application_id,
                user_type: user.user_type,
                user_name: user.user_name,
                user_short_name: user.user_short_name,
                user_emialid: user.email_id,
                user_mobile: user.mobile,
                user_country_code: user.country_iso_code,
                user_country: user.country,
                user_city: user.city,
                user_auth_token: authToken
            });
        }
    }).catch(function (err) {
        res.status(404).json({
            errMessage: err,
            message: 'user not found...'
        });
    });
};

module.exports = {
    newUserRegistration: newUserRegistration,
    userLogin: userLogin
}