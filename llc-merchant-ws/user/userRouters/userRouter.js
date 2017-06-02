var express = require('express');
var userRouter = express.Router();

var userController = require('./../userControllers/userController');

//user routes
userRouter.route('/register').post(userController.newUserRegistration);
userRouter.route('/login').post(userController.userLogin);
userRouter.route('/logout').patch(userController.userLogout);

module.exports = userRouter;