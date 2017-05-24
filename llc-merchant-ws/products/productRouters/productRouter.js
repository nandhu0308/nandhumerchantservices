var express = require('express');
var productRouter = express.Router();

var productController = require('./../productControllers/productController')

productRouter.route('/category/new').post(productController.newProductCategory);
productRouter.route('/category/get/all').get(productController.getProductCategories);

module.exports = productRouter;