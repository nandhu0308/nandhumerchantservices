var express = require('express');
var journalRouter = express.Router();

var journalController=require('./../journalControllers/journalController');
var journalDeviceController=require('./../journalControllers/journalDeviceController');


journalRouter.route('/journallist/all').get(journalController.getJournals);
journalRouter.route('/settings/:appln_name/:stream_name').get(journalController.getJournalSettings);
journalRouter.route('/log/activity').post(journalController.logJournalActivity);
journalRouter.route('/list/channel/:channelId').get(journalController.getJournalsByChannelId);
journalRouter.route('/get/settings/:journalId').get(journalController.getJournalSettingsByJournalId);
journalRouter.route('/get/device/:settingId').get(journalController.getJournalDevice);
journalRouter.route('/new').post(journalController.createJournal);
journalRouter.route('/get/setting-device/:settingId').get(journalController.getJournalSettingBySettingId);
journalRouter.route('/update').patch(journalController.updateJournal);
journalRouter.route('/setting/new').post(journalController.newJournalSettingAndDevice);

journalRouter.route('/journalandsetting/:channelId').get(journalController.getJournalandSettingsBychannelId);


// journal Devices
journalRouter.route('/device/all').get(journalDeviceController.getAllJournalDevices);
journalRouter.route('/update').put(journalDeviceController.updateJournalDevice);

module.exports = journalRouter;


