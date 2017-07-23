var express = require('express');
var userRouter = express.Router();

var userController = require('./../userControllers/userController');

//user routes
userRouter.route('/').get(userController.getVersion);
userRouter.route('/register').post(userController.newUserRegistration);
userRouter.route('/login').post(userController.userLogin);
userRouter.route('/logout').patch(userController.userLogout);
userRouter.route('/roles/:userId').get(userController.getUserAssignedModules);

module.exports = userRouter;