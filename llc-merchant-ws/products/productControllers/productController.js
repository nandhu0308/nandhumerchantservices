var Product = require('./../productModels/productModel');
var ProductImages = require('./../productModels/productImagesModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');


var getProducts = function (req, res) {
    
    authToken = req.headers.authorization;
    
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
               
                Product.findAll({
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    },
                    where: {
                        is_removed: true
                    }
                }).then(function (productsAll) {
                    res.status(200).json(productsAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No Products  found...'
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


var getProductById = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                productId = req.params.id;
                Product.findById(productId, {
                    attributes: {
                        exclude: ['created_by', 'created_on', 'updated_by', 'updated_on']
                    }
                }).then(product => {
                    if (product === null) {
                        res.status(404).json({
                            message: 'No Product found...'
                        });
                    } else {
                        res.status(200).json(product);
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'No Product found...'
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



var newProduct = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                reqObj = req.body;
                Product.create({
                    category_id: reqObj.category_id,
                    subcategory_id: reqObj.subcategory_id,
                    product_name: reqObj.product_name,
                    product_price: reqObj.product_price,
                    discount_rate: reqObj.discount_rate,
                    product_description: reqObj.product_description,
                    product_size_text: reqObj.product_size_text,
                    product_size_number: reqObj.product_size_number,
                    product_color: reqObj.product_color,
                    is_removed: false,
                    pod: reqObj.pod,
                    add_to_cart: reqObj.add_to_cart
                }).then(product => {
                    if (product === null) {
                        res.status(500).json({
                            message: 'failed to create...'
                        });
                    } else {
                        res.status(200).json({
                            productId: product.id,
                            message: 'success'
                        });
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        message: 'failed to create...'
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




var newProductImages = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                productId = req.params.id;
                reqObj = req.body;
                console.log(reqObj.length);
                var inserted = 0;
                var failed = 0;
                reqObj.forEach(function (i) {
                    ProductImages.create({
                        product_id: productId,
                        image_url: i.image_url
                    }).then(productImages => {
                        inserted += 1;
                        console.log(inserted);
                    }).catch(function (err) {
                        failed += 1;
                    });
                });
                console.log(inserted);
                console.log(failed);
                if (inserted === reqObj.length) {
                    res.status(200).json({
                        productId: productId,
                        message: 'success'
                    });
                } else {
                    res.status(500).json({
                        message: 'something went wrong...'
                    });
                }
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
    newProduct: newProduct,
    getProducts:getProducts,
    getProductById:getProductById,
    newProductImages: newProductImages
}