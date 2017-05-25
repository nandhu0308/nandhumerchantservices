var express = require('express');
var productRouter = express.Router();

var productCategoryController = require('./../productControllers/productCategoryController');
var productSubcategoryController = require('./../productControllers/productSubcategoryController');
var productController = require('./../productControllers/productController');

//Category Routes
productRouter.route('/category/new').post(productCategoryController.newProductCategory);
productRouter.route('/category/get/:id').get(productCategoryController.getProductCategoryById);
productRouter.route('/category/all').get(productCategoryController.getProductCategories);
productRouter.route('/category/seller/:id').get(productCategoryController.getProductCategoriesBySellerId);
productRouter.route('/category/live').patch(productCategoryController.updateProductCategoryLive);

//Subcategory Routes
productRouter.route('/subcategory/new').post(productSubcategoryController.newProductSubcategory);
productRouter.route('/subcategory/all').get(productSubcategoryController.getProductSubcategories);
productRouter.route('/subcategory/live').patch(productSubcategoryController.updateProductSubcategoryLive);

//Product Routes
productRouter.route('/new').post(productController.newProduct);
productRouter.route('/images/:id').post(productController.newProductImages);

module.exports = productRouter;