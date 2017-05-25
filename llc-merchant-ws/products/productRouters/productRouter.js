var express = require('express');
var productRouter = express.Router();

var productController = require('./../productControllers/productCategoryController')

productRouter.route('/category/new').post(productController.newProductCategory);
productRouter.route('/category/get/all').get(productController.getProductCategories);
productRouter.route('/category/live').patch(productController.updateProductCategoryLive);

module.exports = productRouter;