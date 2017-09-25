var express = require('express');
var journalRouter = express.Router();

var journalController=require('./../journalControllers/journalController');

journalRouter.route('/journallist/all').get(journalController.getJournals);
journalRouter.route('/settings/:appln_name/:stream_name').get(journalController.getJournalSettings);
journalRouter.route('/log/activity').post(journalController.logJournalActivity);
journalRouter.route('/list/channel/:channelId').get(journalController.getJournalsByChannelId);
journalRouter.route('/get/settings/:journalId').get(journalController.getJournalSettingsByJournalId);
journalRouter.route('/get/device/:settingId').get(journalController.getJournalDevice);

module.exports = journalRouter;


