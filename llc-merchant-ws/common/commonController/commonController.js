var Country = require('./../commonModel/country');
var State = require('./../commonModel/state');
var City = require('./../commonModel/city');
var Rank = require('./../commonModel/rank');
var Language = require('./../commonModel/language');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');


var getCountry = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                Country.findAll({
                   
                    where: {
                        is_active: true
                    }
                }).then(function (countryAll) {
                    res.status(200).json(countryAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No Country  found...'
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

var getState = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                countryId=req.params.countryid;
                State.findAll({
                   
                    where: {
                        is_active: true,
                        country_id:countryId
                    }
                }).then(function (stateAll) {
                    res.status(200).json(stateAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No State found...'
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

var getCity = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                stateId=req.params.stateid;
                City.findAll({
                    
                    where: {
                        is_active: true,
                        state_id:stateId
                    }
                }).then(function (cityAll) {
                    res.status(200).json(cityAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No City found...'
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


var getDisplayRank = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                stateId=req.params.stateid;
                Rank.findAll({
                    
                    where: {
                        is_active: true
                       
                    }
                }).then(function (rankAll) {
                    res.status(200).json(rankAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No Rank found...'
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


var getLanguage = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                Language.findAll({
                   
                    where: {
                        is_active: true
                    }
                }).then(function (languageAll) {
                    res.status(200).json(languageAll);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'No language  found...'
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
   getCountry:getCountry,
   getState:getState,
   getCity:getCity,
   getDisplayRank:getDisplayRank,
   getLanguage:getLanguage
}