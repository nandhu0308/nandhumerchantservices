var express=require('express');
var journalSettingRouter=express.Router();

var JournalSettingController=require('./../journalControllers/journalSettingController');

journalSettingRouter.route('/journalSetting/all').get(JournalSettingController.getJournalSetting);

module.exports = journalSettingRouter;