var express = require('express');
var journalDevicesRouter = express.Router();

var journalDeviceController=require('./../journalControllers/journalDeviceController');

journalDevicesRouter.route('/journalDevice/all').get(journalDeviceController.getJournalDevices);

module.exports = journalDevicesRouter;