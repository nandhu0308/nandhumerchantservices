var express = require('express');
var journalRouter = express.Router();

var journalController=require('./../journalControllers/journalController');
<<<<<<< .mine

=======

>>>>>>> .theirs
journalRouter.route('/journallist/all').get(journalController.getJournals);
journalRouter.route('/settings/:appln_name/:stream_name').get(journalController.getJournalSettings);

module.exports = journalRouter;

<<<<<<< .mine



=======
module.exports = journalRouter;


>>>>>>> .theirs
