var dateformat = require('dateformat');
var UserAuthServices = require('./../../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../../user/services/tokenValidator');
var TemplateController = require('./../../notificationTemplate/templateModels/templateModel');
var LogController = require('./../../notificationTemplate/templateModels/logModel');
var SendStreamingTemplate = require('./../../notificationTemplate/templateModels/templateModel');
var StartBroadcasting = require('./../../notificationTemplate/templateModels/templateImagesModel');
var StopBroadcasting = require('./../../notificationTemplate/templateModels/templateImagesModel');
const nodemailer = require('nodemailer');

var sequelize = require('sequelize');

TemplateController.hasMany(StartBroadcasting, { foreignKey: 'template_id' })
StartBroadcasting.belongsTo(TemplateController, { foreignKey: 'template_id' })
TemplateController.hasMany(StopBroadcasting, { foreignKey: 'template_id' })
StopBroadcasting.belongsTo(TemplateController, { foreignKey: 'template_id' })

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
    // var response = streamingTemplate.template_name.toString().toLowerCase();
var result =
"<td width='55'rowspan='2'height='20px' border-bottom='1'>"+
"<tr>"+
"<p><img src='https://lh3.googleusercontent.com/HySDSa3_G2vJOEzLi-zuugVp9ihcZ84fNgj0Cjh656dbZgf0z6GFmvEa-rbknZEosg=w300' alt='Haappy_Logo' width='100px'height='80px' hspace='100' align='middle'> <a style='color:limegreen'target='_blank'href='http://seller.haappyapp.com'>Your Account</a> | <a style='color:limegreen' target='_blank'href='http://www.haappyapp.com/'>haappy.com</a> </p>"+
"</tr></td>"+  
 "<td><hr /></td>"+
   "<h2 style='color:maroon'>Hello customer,</h2><p>Greetings from Haappy.com!</p><p>We are pleased to inform you that following items in your Order OD206631634115300000 have been packed by the seller and are ready to be shipped. Once the item(s) are shipped, you will receive an email with the Courier Tracking ID and the link where you can track your order.</p></div></div>"+
   "<td><hr /></td>"+
   "<table><tbody><p>Address:</p><p>Sowmya,<br>2nd Main Road,<br>Domlur Layout,Near Domlur Flyover,<br>BANGALORE,KARNATAKA 560071,<br>India.</p></table>"+
   "<td><hr /></td>"+
   "<table><h2 style='color:maroon'bottom-border='1px'>Shipment Details</h2>"+ "<td><hr /></td>"+
 "<tr><p><img src='https://3.imimg.com/data3/IL/EL/MY-6625614/lenovo-g50-80-notebook-250x250.jpg' alt='Lenova_laptop' width='150px'height='150px' hspace='50' align='left'><a style='color:limegreen'target='_blank'href='http://www.amazon.in/Lenovo-15-6-inch-A8-7410-Integrated-Graphics/dp/B01KO18NGW/ref=sr_1_3?s=electronics&ie=UTF8&qid=1503557470&sr=1-3&keywords=lenovo+laptop'>Lenovo 110 -15ACL 15.6-inch Laptop (AMD A8-7410/4GB/1TB/Windows 10 Home/Integrated Graphics),Black</a><p>Price:Rs.24,990.00</p></p></table>"+
"<table border='1px' border-collapse='collapse'cellpadding='10'cellspacing='0'>"+
    "<tr style='color:white'bgcolor='blue'><th>Id</th><th>Templatename</th><th>Description</th><th>TemplateContent</th><th>Active</th></tr>"+
      "<tr><td>"+streamingTemplate.id+"</td>"+
      "<td>"+streamingTemplate.template_name+"</td>"+
        "<td>"+streamingTemplate.description+"</td>"+
         "<td>"+streamingTemplate.template_content+"</td>"+
         "<td>"+streamingTemplate.is_active+"</td></tr>"+
         "<tr style='color:green'><th colspan='2'>Message</th><td colspan='3'>Order Dispatched</td></tr></table>"+
         "<p>We hope to see you again soon!<p>haappy.com</p>"+
         "<td><hr /></td>"+
         "<h5>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</h5>";
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
        to: 'uma.raja@limitlesscircle.com,',
        subject: 'Order-confirmation',
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
var startBroadcastingTemplate = function(req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    return tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function(userSessions) {
    StreamingTemplateId = req.params.id;
    return StartBroadcasting.findById(StreamingTemplateId).then(function(streamingTemplate) {
        res.json(streamingTemplate);
    var result ="<body border: 1px solid black;outline-color: red;><header background-color='grey'><img src="+streamingTemplate.start_img+" alt='destination_img' width='600px' height='100px'></header><h3>Hi "+streamingTemplate.client_name+"!</h3><p>We are pleased to inform you that " + streamingTemplate.client_name+" newschannel streaming has been started sucessfully on "+streamingTemplate.destination_type+"</p>"+
    "<img src="+streamingTemplate.client_img+" alt='client_img' width='600px' height='500px'>"+
    "<h5>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</h5></body>";
    
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
            subject: 'Streaming Started',
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
    var stopBroadcastingTemplate = function(req, res) {
        authToken = req.headers.authorization;
        userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
        var todayDate = new Date();
        var expireDate = new Date(userAuthObj.expire_date);
        return tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function(userSessions) {
        StreamingTemplateId = req.params.id;
        return StopBroadcasting.findById(StreamingTemplateId).then(function(streamingTemplate) {
            res.json(streamingTemplate);
            var result ="<body border: 1px solid black;outline-color: red;><header background-color='grey'><img src="+streamingTemplate.stop_img+" alt='destination_img' width='600px' height='100px'></header><h3>Hi"+streamingTemplate.client_name+"!</h3><p>We are pleased to inform you that  " + streamingTemplate.client_name +" newschannel streaming has been stopped sucessfully on "+streamingTemplate.destination_type+"</p>"+
            "<img src="+streamingTemplate.client_img+" alt='client_img' width='600px' height='500px'>"+
            "<h5>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</h5></body>";
        
        
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
                subject: 'Streaming Stopped',
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
    startBroadcastingTemplate : startBroadcastingTemplate,
    stopBroadcastingTemplate : stopBroadcastingTemplate
    
};


