var ProductCategory = require('./../productModels/productCategoryModel');

var newProductCategory = function(req, res){
    reqObj = req.body;
    ProductCategory.create({
        category_name : reqObj.category_name,
        category_description : reqObj.category_description,
        seller_id : reqObj.seller_id,
        category_image : reqObj.category_image,
        is_active : reqObj.is_active,
        created_by : reqObj.created_by,
        updated_by : reqObj.updated_by
    }).then(function(productCategory){
        res.json({
            id : productCategory.id,
            message : 'success'
        });
    }).catch(function(err){
        res.json({
            message : 'creating new product category failed...'
        });
    });
};

var getProductCategories = function(req, res){
    ProductCategory.findAll({
        attributes : { exclude : ['created_by', 'created_on', 'updated_by', 'updated_on']}
    }).then(function(productCategoryAll){
        res.json(productCategoryAll);
    }).catch(function(err){
        res.json({
            message : 'No Product Categories found...'
        });
    });
};  

module.exports = {
    newProductCategory : newProductCategory,
    getProductCategories : getProductCategories
}