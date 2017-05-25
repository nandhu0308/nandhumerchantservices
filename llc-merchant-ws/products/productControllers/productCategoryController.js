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
        res.status(200).json({
            id : productCategory.id,
            message : 'success'
        });
    }).catch(function(err){
        res.status(500).json({
            message : 'creating new product category failed...'
        });
    });
};

var getProductCategories = function(req, res){
    ProductCategory.findAll({
        attributes : { exclude : ['created_by', 'created_on', 'updated_by', 'updated_on']}
    }).then(function(productCategoryAll){
        res.status(200).json(productCategoryAll);
    }).catch(function(err){
        res.status(404).json({
            message : 'No Product Categories found...'
        });
    });
}; 

var updateProductCategoryLive = function(req, res){
    reqObj = req.body;
    ProductCategory.findById(reqObj.id).then(function(productCategory){
            if(productCategory){
                productCategory.updateAttributes({
                    is_active : reqObj.live
                }).then(function(){
                    res.status(200).json({
                        id : productCategory.id,
                        newLiveStatus : productCategory.is_active
                    });
                }).catch(function(){
                    res.status(500).json({
                    message : 'category update failed...'
                });
                });
            } else {
                res.status(404).json({
                    message : 'category not found...'
                });
            }
        }).catch(function(){
            res.status(500).json({
                message : 'something went wrong...'
            }); 
        });
};

module.exports = {
    newProductCategory : newProductCategory,
    getProductCategories : getProductCategories,
    updateProductCategoryLive : updateProductCategoryLive
}