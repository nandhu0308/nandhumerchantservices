var express = require('express');
var authRouter = express.Router();

var userAuthServices = require('./../sessions-services/userAuthServices');

//Auth routes
authRouter.route('/').post(userAuthServices.guestAuthTokenGenerator);

module.exports = authRouter;