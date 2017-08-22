var express = require('express');
var documentRouter = express.Router();
var documentController = require('./../documentController/documentController');
//Broadcaster Routes
documentRouter.route('/all').get(documentController.getDocumentType);
module.exports=documentRouter;