var express = require('express');
var journalDevicesRouter = express.Router();

var journalDeviceController=require('./../journalControllers/journalDeviceController');

journalDevicesRouter.route('/device/all').get(journalDeviceController.getJournalDevices);

module.exports = journalDevicesRouter;