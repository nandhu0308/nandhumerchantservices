var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var SmtpSetting = require('./../smtpModels/smtpSettingModel');
var nodemailer = require('nodemailer');


   var getSmtpSetting = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               
                SmtpSetting.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        is_active: true
                    }
                }).then(function (SmtpSettingAll) {
                    res.status(200).json(SmtpSettingAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'Not found...'
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
 var sendSmtpMail = function (req,res) {
     
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
     auth: true,
    active: true,
    secure: true,
    requireTLS: true,
    auth: {
        user: 'transactions@limitlesscircle.com',
        pass: 'Engage@12E'
    }
});

let mailOptions = {
    from: 'transactions@limitlesscircle.com',
    to: 'uma.raja@limitlesscircle.com',
    subject: 'mail notification Test',
    text: 'Hello !!!!!!!!!everything works fine'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log("mail not sent" +error.message);
    }
    console.log('success');
});
};
module.exports = {
    getSmtpSetting : getSmtpSetting,
    sendSmtpMail : sendSmtpMail
};

 