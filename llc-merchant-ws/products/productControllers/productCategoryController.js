var dateformat = require('dateformat');
var ProductCategory = require('./../productModels/productCategoryModel');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
var uploadServices = require('./../../upload-services/tempUploadServices/tempUpload');

var newProductCategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                ProductCategory.create({
                    application_id: reqObj.application_id,
                    category_name: reqObj.category_name,
                    category_description: reqObj.category_description,
                    category_image: reqObj.category_image,
                    seller_id: reqObj.seller_id,
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
                        errMessage: err,
                        message: 'creating new product category failed...'
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var getProductCategories = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               
                ProductCategory.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        is_active: true
                    }
                }).then(function (productCategoryAll) {
                    res.status(200).json(productCategoryAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No Product Categories found...'
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var updateProductCategoryLive = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
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
                        }).catch(function (err) {
                            console.log(err)
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var getProductCategoriesBySellerId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                sellerId = req.params.id;
                ProductCategory.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        seller_id: sellerId,
                        is_active: true
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
}

var getProductCategoryById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                categoryId = req.params.id;
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
};

var imageUploadForCategory = function (req, res) {
    sellerId = req.params.sellerId;
    categoryId = req.params.categoryId;
    uploadServices.fileUpload(req, res, sellerId, categoryId);
};

var updateProductCategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                ProductCategory.findById(reqObj.id, {
                    attributes: {
                        exclude: ['created_by', 'created_on']
                    }
                }).then(function (productCategory) {
                    productCategory.updateAttributes({
                        category_name: reqObj.category_name,
                        category_description: reqObj.category_description,
                        category_image: reqObj.category_image,
                        is_active: reqObj.is_active
                    }).then(function () {
                        res.status(200).json({
                            id: reqObj.id,
                            category_name: productCategory.category_name,
                            category_description: productCategory.category_description,
                            category_image: productCategory.category_image,
                            is_active: productCategory.is_active
                        });
                    }).catch(function (err) {
                        console.log(err);
                        res.status(500).json({
                            message: 'Update Failed...'
                        });
                    });
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No category found...'
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
        res.status(401).json({
            message: 'Token Expired...'
        });
    });
}

module.exports = {
    newProductCategory: newProductCategory,
    getProductCategories: getProductCategories,
    updateProductCategoryLive: updateProductCategoryLive,
    getProductCategoriesBySellerId: getProductCategoriesBySellerId,
    getProductCategoryById: getProductCategoryById,
    imageUploadForCategory: imageUploadForCategory,
    updateProductCategory: updateProductCategory
};