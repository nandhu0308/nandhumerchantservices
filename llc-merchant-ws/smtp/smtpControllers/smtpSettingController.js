var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var smtpSetting = require('./../../smtp/smtpModels/smtpSettingModel');
var nodemailer = require("nodemailer");
var debug = require('debug')('expressdebug:server');

    var getSmtpSetting = function (req,res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expireDate);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id,authToken).then(function (userSessions) {
        if(userSessions.length === 1){
            if(expire >= todayDate){
                reqObj = req.body;
                smtpSetting.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        is_active: true
                    }
                }).then(function (smtpSetting){
                    res.status(200).json({
                        message : 'success'
                    });
                }).catch(function (err){
                    console.log(err);
                    res.status(500).json({
                        errMessage:err,
                        message : 'something went wrong...'
                    });
                });
            } else {
                res.status(401).json({
                    message : 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message : 'Token Expired...'
            });
        }
    }).catch( function (err){
        res.status(401).json({
            message : 'Token Expired...'
        });
    });

};
 var sendSmtpMail = function (req,res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expireDate);
    tokenOk = TokenValidator.validateToken(userAuthObj.user_id,authToken).then(function (userSessions) {
        if(userSessions.length === 1){
            if(expire >= todayDate){
                reqObj = req.body;
                app.post('/send', function(req, res){
                    if(req.body.email == "" || req.body.subject == "") {
                        res.send("Error: Email & Subject should not blank");
                            return false;
                                    }
                    res.send("Email has been sent successfully");
    var smtpTransport = nodemailer.createTransport("SMTP",{
    service:gmail,
    host: "smtp.gmail.com", 
    secureConnection: false, 
    port : 25,
     auth: {
                 user: "transactions@limitlesscircle.com",
                 pass: "['Engage@12E']"
            }
        });
    var mailOptions = {
            from: "Node Emailer ? <no-reply@limitlesscircle.in>", 
            to:'umaraja1124@gmail.com', 
            subject: req.body.subject+" ?", 
            text: "Hello world ?",  
        }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
             res.send("Email could not sent due to error: "+error);
             console.log('Error');
        }else{
             res.send("Email has been sent successfully");
             console.log('mail sent');
        } 
    }); 
    }).then(function (smtpSetting){
        res.status(200).json({
            message : 'success'
            });
    }).catch(function (err){
                    console.log(err);
                    res.status(500).json({
                        errMessage:err,
                        message : 'something went wrong...'
                    });
                });
            } else {
                res.status(401).json({
                    message : 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message : 'Token Expired...'
            });
        }
    }).catch( function (err){
        res.status(401).json({
            message : 'Token Expired...'
        });
    });

};
module.exports = {
    getSmtpSetting : getSmtpSetting,
    sendSmtpMail : sendSmtpMail
};

 