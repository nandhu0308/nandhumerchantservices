var ProductCategory = require('./../productModels/productCategoryModel');

var newProductCategory = function (req, res) {
    reqObj = req.body;
    ProductCategory.create({
        application_id: reqObj.application_id,
        category_name: reqObj.category_name,
        category_description: reqObj.category_description,
        seller_id: reqObj.seller_id,
        category_image: reqObj.category_image,
        is_active: reqObj.is_active,
        created_by: reqObj.created_by,
        updated_by: reqObj.updated_by
    }).then(function (productCategory) {
        res.status(200).json({
            id: productCategory.id,
            message: 'success'
        });
    }).catch(function (err) {
        res.status(500).json({
            message: 'creating new product category failed...'
        });
    });
};

var getProductCategories = function (req, res) {
    ProductCategory.findAll({
        attributes: { 
            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on'] 
        },
        where : {
            is_active : true
        }
    }).then(function (productCategoryAll) {
        res.status(200).json(productCategoryAll);
    }).catch(function (err) {
        res.status(404).json({
            message: 'No Product Categories found...'
        });
    });
};

var updateProductCategoryLive = function (req, res) {
    reqObj = req.body;
    ProductCategory.findById(reqObj.id).then(function (productCategory) {
        if (productCategory) {
            productCategory.updateAttributes({
                is_active: reqObj.is_active
            }).then(function () {
                res.status(200).json({
                    id: productCategory.id,
                    newLiveStatus: productCategory.is_active
                });
            }).catch(function () {
                res.status(500).json({
                    message: 'category update failed...'
                });
            });
        } else {
            res.status(404).json({
                message: 'category not found...'
            });
        }
    }).catch(function (err) {
        res.status(500).json({
            message: 'something went wrong...'
        });
    });
};

var getProductCategoriesBySellerId = function (req, res) {
    sellerId = req.params.id;
    ProductCategory.findAll({
        attributes: {
            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
        },
        where: {
            seller_id: sellerId,
            is_active : true
        }
    }).then(sellerProductCategories => {
        if (sellerProductCategories.length > 0) {
            res.status(200).json(sellerProductCategories);
        } else {
            res.status(404).json({
                message: 'No category found for seller...'
            });
        }
    }).catch(function (err) {
        res.status(500).json({
            message: 'No category found for seller...'
        })
    });
}

var getProductCategoryById = function (req, res) {
    categoryId = req.params.id;
    console.log(categoryId);
    ProductCategory.findById(categoryId, {
        attributes: {
            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
        }
    }).then(productCategory => {
        if (productCategory === null) {
            res.status(404).json({
                message: 'No category found...'
            });
        } else {
            res.status(200).json(productCategory);
        }
    }).catch(function (err) {
        res.status(500).json({
            message: 'No category found...'
        })
    });
};

module.exports = {
    newProductCategory : newProductCategory,
    getProductCategories : getProductCategories,
    updateProductCategoryLive : updateProductCategoryLive,
    getProductCategoriesBySellerId : getProductCategoriesBySellerId,
    getProductCategoryById : getProductCategoryById
}