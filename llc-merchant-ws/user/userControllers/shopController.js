var dateformat = require('dateformat');
var ApplicationUsers = require('./../userModels/applicationUsersModel');
var ApplicationsModules = require('./../../applications/applicationsModels/applicationsModulesModel');
var ApplicationsRoleModules = require('./../../applications/applicationsModels/applicationRoleModulesModel');
var ApplicationsRoleModel = require('./../../applications/applicationsModels/applicationsRolesModel');
var AssignedUserRoleModules = require('./../../applications/applicationsModels/assignedUserRoleModuleModel');
var UserSessions = require('./../userModels/userSessionModel');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var Broadcaster = require('./../../broadcasters/broadcasterModels/broadcastersModel');
var Shop = require('./../userModels/shopsModel');
var TokenValidator = require('./../services/tokenValidator');
var Products = require('./../../products/productModels/productModel');
var ProductCategory = require('./../../products/productModels/productCategoryModel');
var ProductSubcategory = require('./../../products/productModels/productSubcategoryModel');

var newShop = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                requestCategory = reqObj.category;
                requestSubcategory = reqObj.sub_category;
                requestProduct = reqObj.product;
                Shop.create({
                    application_id: reqObj.application_id,
                    seller_shop_name: reqObj.seller_shop_name,
                    about_shop: reqObj.about_shop,
                    shop_code: reqObj.shop_code,
                    seller_location_latitude: reqObj.seller_location_latitude,
                    seller_location_longitude: reqObj.seller_location_longitude,
                    seller_kyc_doc_type: reqObj.seller_kyc_doc_type,
                    seller_kyc_doc_value: reqObj.seller_kyc_doc_value,
                    is_deleted: reqObj.is_deleted,
                    created_by: reqObj.created_by,
                    updated_by: reqObj.updated_by
                }).then(shop => {
                    console.log("shop created");
                    ProductCategory.create({
                        application_id: requestCategory.application_id,
                        category_name: requestCategory.category_name,
                        category_description: requestCategory.category_description,
                        seller_id: shop.id,
                        category_image: requestCategory.category_image,
                        image_file_name: requestCategory.image_file_name,
                        is_active: requestCategory.is_active,
                        created_by: requestCategory.created_by,
                        updated_by: requestCategory.updated_by
                    }).then(category => {
                        console.log("category created");
                        ProductSubcategory.create({
                            subcategory_name: requestSubcategory.subcategory_name,
                            subcategory_description: requestSubcategory.subcategory_description,
                            category_id: category.id,
                            subcategory_image: requestSubcategory.subcategory_image,
                            image_file_name: requestSubcategory.image_file_name,
                            is_active: requestSubcategory.is_active,
                            created_by: requestSubcategory.created_by,
                            updated_by: requestSubcategory.updated_by
                        }).then(subcategory => {
                            console.log("subcategory created");
                            Products.create({
                                category_id: category.id,
                                subcategory_id: subcategory.id,
                                product_name: requestProduct.product_name,
                                product_price: requestProduct.product_price,
                                discount_rate: requestProduct.discount_rate,
                                product_description: requestProduct.product_description,
                                product_size_text: requestProduct.product_size_text,
                                product_size_number: requestProduct.product_size_number,
                                product_color: requestProduct.product_color,
                                is_removed: requestProduct.is_removed,
                                pod: requestProduct.pod,
                                add_to_cart: requestProduct.add_to_cart,
                                product_image: requestProduct.product_image
                            }).then(product => {
                                console.log("product created");
                                res.status(200).json({
                                    id: shop.id,
                                    message: "shop created successfully!"
                                })
                            }).catch(function (err) {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                    message: 'somehing went wrong!'
                                });
                            });
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                            message: 'somehing went wrong!'
                        });
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'somehing went wrong!'
                    });
                });

            } else {
                res.status(401).json({
                    message: 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message: 'Token Expired...'
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var getShopById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                shopId = req.params.shopId;
                Shop.findById(shopId).then(shop => {
                    if (shop === null) {
                        res.status(404).json({
                            message: 'No shop found!'
                        })
                        return;
                    }
                    res.status(200).json(shop);
                }).catch(function (err) {
                    res.status(500).json({
                        error: err,
                        message: 'something wenr wrong!'
                    });
                });
            } else {
                res.status(401).json({
                    message: 'Not Authorized...'
                });
            }
        } else {
            res.status(401).json({
                message: 'Token Expired...'
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

module.exports = {
    newShop: newShop,
    getShopById: getShopById
};