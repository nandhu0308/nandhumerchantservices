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
userRouter.route('/get/client_keys/:userId').get(userController.getGoogleClientKeysByUserId);

//shop routes
userRouter.route('/shop/new').post(shopController.newShop);
userRouter.route('/shop/get/:shopId').get(shopController.getShopById);
userRouter.route('/shop/all').get(shopController.getAllShops);

module.exports = userRouter;