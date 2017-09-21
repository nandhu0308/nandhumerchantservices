var express = require('express');
var journalRouter = express.Router();

var journalController=require('./../journalControllers/journalController');

journalRouter.route('/journalchannel/all').get(journalController.getJournals);

module.exports = journalRouter;