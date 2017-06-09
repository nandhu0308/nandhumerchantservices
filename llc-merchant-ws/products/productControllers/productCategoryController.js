var multer = require('multer');
var dateformat = require('dateformat');
var ProductCategory = require('./../productModels/productCategoryModel');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

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

//multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadTemp/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

//multer settings
var upload = multer({
    storage: storage
}).single('file');

var imageUpload = function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
};

module.exports = {
    newProductCategory: newProductCategory,
    getProductCategories: getProductCategories,
    updateProductCategoryLive: updateProductCategoryLive,
    getProductCategoriesBySellerId: getProductCategoriesBySellerId,
    getProductCategoryById: getProductCategoryById,
    imageUpload: imageUpload
}