var ProductSubcategory = require('./../productModels/productSubcategoryModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var newProductSubcategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                ProductSubcategory.create({
                    subcategory_name: reqObj.subcategory_name,
                    subcategory_description: reqObj.subcategory_description,
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

var getProductSubcategories = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                categoryId = req.params.categoryId;
                ProductSubcategory.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        category_id: categoryId,
                        is_active: true
                    }
                }).then(function (productSubcategories) {
                    res.status(200).json(productSubcategories);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No product Subcategory found...'
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



var updateProductSubcategoryLive = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
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

var getSubcategoryById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                subcategoryId = req.params.id;
                ProductSubcategory.findById(subcategoryId).then(function (productSubcategory) {
                    if (productSubcategory === null) {
                        res.status(404).json({
                            message: 'product subcategory not found...'
                        })
                    } else {
                        res.status(200).json(productSubcategory);
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

var getProductSubcategoryByCategoryId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                categoryId = req.params.id;
                ProductSubcategory.findAll({
                    where: {
                        category_id: categoryId
                    },
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                }).then(productSubcategories => {
                    res.status(200).json(productSubcategories);
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'something went wrong...'
                    });
                })
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

var editProductSubcategory = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                ProductSubcategory.findById(reqObj.id).then(function (productSubcategory) {
                    if (productSubcategory === null) {
                        res.status(404).json({
                            message: 'product subcategory not found...'
                        });
                    } else {
                        productSubcategory.updateAttributes({
                            subcategory_name: reqObj.subcategory_name,
                            subcategory_description: reqObj.subcategory_description,
                            is_active: reqObj.is_active
                        }).then(function () {
                            res.status(200).json(productSubcategory);
                        }).catch(function (err) {
                            res.status(500).json({
                                error: err,
                                message: 'something went wrong...'
                            });
                        });
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        error: err,
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

module.exports = {
    newProductSubcategory: newProductSubcategory,
    getProductSubcategories: getProductSubcategories,
    updateProductSubcategoryLive: updateProductSubcategoryLive,
    getProductSubcategoryByCategoryId: getProductSubcategoryByCategoryId,
    getSubcategoryById: getSubcategoryById,
    editProductSubcategory: editProductSubcategory
}