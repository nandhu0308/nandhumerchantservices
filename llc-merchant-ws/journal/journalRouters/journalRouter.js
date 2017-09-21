var express = require('express');
var journalRouter = express.Router();

var journalController = require('./../journalControllers/journalController');

journalRouter.route('/list/all').get(journalController.getJournals);
journalRouter.route('/settings/:appln_name/:stream_name').get(journalController.getJournalSettings);

module.exports = journalRouter;