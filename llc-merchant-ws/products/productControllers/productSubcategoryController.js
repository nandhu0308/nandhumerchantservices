var ProductSubcategory = require('./../productModels/productSubcategoryModel');

var newProductSubcategory = function (req, res) {
    reqObj = req.body;
    ProductSubcategory.create({
        subcategory_name: reqObj.subcategory_name,
        subcategory_decription: reqObj.subcategory_decription,
        category_id: reqObj.category_id,
        subcategory_image: reqObj.subcategory_image,
        is_active: reqObj.is_active,
        created_by: reqObj.created_by,
        updated_by: reqObj.updated_by
    }).then(function (productSubcategory) {
        res.status(200).json({
            id: productSubcategory.id,
            message: 'success'
        });
    }).catch(function (err) {
        res.status(500).json({
            message: 'creating new product subcategory failed...'
        });
    });
};

var getProductSubcategories = function (req, res) {
    ProductSubcategory.findAll({
        attributes: {
            exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
        },
        where : {
            is_active : true
        }
    }).then(function (productSubcategories) {
        res.status(200).json(productSubcategories);
    }).catch(function (err) {
        res.status(404).json({
            message: 'No product Subcategory found...'
        });
    });
};

var updateProductSubcategoryLive = function (req, res) {
    reqObj = req.body;
    ProductSubcategory.findById(reqObj.id).then(function (productSubcategory) {
        if (productSubcategory === null) {
            res.status(404).json({
                message: 'product subcategory not found...'
            });
        } else {
            productSubcategory.updateAttributes({
                is_active: reqObj.is_active
            }).then(function () {
                res.status(200).json({
                    subcategoryId: productSubcategory.id,
                    newLiveStatus: productSubcategory.is_active
                });
            }).catch(function () {
                res.status(404).json({
                    message: 'product subcategory found but update failed...'
                });
            })
        }
    }).catch(function (err) {
        res.status(500).json({
            message: 'something went wrong...'
        });
    });
}

module.exports = {
    newProductSubcategory : newProductSubcategory,
    getProductSubcategories : getProductSubcategories,
    updateProductSubcategoryLive : updateProductSubcategoryLive
}