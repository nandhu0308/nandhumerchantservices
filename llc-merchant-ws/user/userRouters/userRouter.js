var express = require('express');
var userRouter = express.Router();

var userController = require('./../userControllers/userController');
var shopController = require('./../userControllers/shopController');

//user routes
userRouter.route('/').get(userController.getVersion);
userRouter.route('/register').post(userController.newUserRegistration);
userRouter.route('/login').post(userController.userLogin);
userRouter.route('/logout').patch(userController.userLogout);
userRouter.route('/roles/:userId').get(userController.getUserAssignedModules);
userRouter.route('/get/:userId').get(userController.getUserById);

//shop routes
userRouter.route('/shop/new').post(shopController.newShop);

module.exports = userRouter;