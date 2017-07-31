var express=require('express');
var smtpRouter=express.Router();

var smtpSettingController=require('./../smtpControllers/smtpSettingController');

smtpRouter.route('/smtpSetting/all').get(smtpSettingController.getSmtpSetting);
smtpRouter.route('/smtpSetting/send').post(smtpSettingController.sendSmtpMail);


module.exports = smtpRouter;
