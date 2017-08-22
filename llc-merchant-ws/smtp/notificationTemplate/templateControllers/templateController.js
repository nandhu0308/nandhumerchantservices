var dateformat = require('dateformat');
var UserAuthServices = require('./../../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../../user/services/tokenValidator');
var TemplateController = require('./../../notificationTemplate/templateModels/templateModel');
var LogController = require('./../../notificationTemplate/templateModels/logModel');
var sendStreamingTemplate = require('./../../notificationTemplate/templateModels/templateModel');
const nodemailer = require('nodemailer');

var getTemplateController = function(req,res){
    authToken=req.headers.authorization;
    userAuthObj=JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate=new Date();
    var expireDate=new Date(userAuthObj.expire_date);
    tokenOK=TokenValidator.validateToken(userAuthObj.user_id,authToken).then(function(userSessions){
    if (userSessions.length === 1){
        if(expireDate >= todayDate){
            id = req.params.id;
            TemplateController.findById(id).then(function (templateController) {
                if(templateController === null){
                    res.status(404).json({
                        message:'message not found...'
                    })
                } else {
                    res.status(200).json(templateController);
                }
            }).catch(function(err){
                res.status(500).json({
                    message:'something went wrong'
                });
            });
        }else{
            res.status(401).json({
                message:'Not Authorized...'
            });
        }
    }else{
        res.status(401).json({
            message:'Token Expired...'
        });
    }
    }).catch(function(err){
        res.status(401).json({
            message:'Token Expired...'
    });
    });
};
var getLogController = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                LogControllerId = req.params.id;
                LogController.findById(LogControllerId).then(function (logController) {
                    if (logController === null) {
                        res.status(404).json({
                            message: 'message not found...'
                        })
                    } else {
                        res.status(200).json(logController);
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'something went wrong...'
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

var sendStreamingTemplate = function(req, res) {
 authToken = req.headers.authorization;
userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
var todayDate = new Date();
var expireDate = new Date(userAuthObj.expire_date);
return tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function(userSessions) {
StreamingTemplateId = req.params.id;
return TemplateController.findById(StreamingTemplateId).then(function(streamingTemplate) {
    res.json(streamingTemplate);
    console.log(streamingTemplate);
    // var response = streamingTemplate.template_name.toString().toLowerCase();
    var result =
    "<table border='1'border-collapse='collapse'cellpadding='20'cellspacing='0'>"+
    "<tr style='color:blue'><th colspan='5'><h1 text-shadow='2px 2px #FF0000'>E-Notification</h1></th></tr>"+
    "<tr style='color:Red'><th>Id</th><th>Templatename</th><th>Description</th><th>TemplateContent</th><th>Active</th></tr>"+
      "<tr><td>"+streamingTemplate.id+"</td>"+
      "<td>"+streamingTemplate.template_name+"</td>"+
        "<td>"+streamingTemplate.description+"</td>"+
         "<td>"+streamingTemplate.template_content+"</td>"+
         "<td>"+streamingTemplate.is_active+"</td></tr>"+
         "<tr style='color:green'><th colspan='2'>Message</th><td colspan='3'>Running sucessfully</td></tr></table>";
   let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        auth: true,
        active: true,
        secure: true,
        requireTLS: true,
        auth: {
            user: 'uma.raja@limitlesscircle.com',
            pass: 'umaraja24'
            }
        });
        let mailOptions = {
        from: 'uma.raja@limitlesscircle.com',
        to: 'uma.raja@limitlesscircle.com',
        subject: 'mail notification Test',
        html:result
                };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
                return console.log("mail not sent" +error.message);
                      }
                console.log('success');
                    });
                 }) 
})
        
};
module.exports = {
    getTemplateController: getTemplateController,
    getLogController : getLogController,
    sendStreamingTemplate : sendStreamingTemplate,
    
};


