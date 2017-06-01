var base64 = require('base-64');
var utf8 = require('utf8');
var dateformat = require('dateformat');
var encrypt = require('./../aes-services/encrypt');
var decrypt = require('./../aes-services/decrypt');

var userAuthTokenGenerator = function(user){
    var encryptedToken = encrypt.encryptData(user);
    var tokenBytes = utf8.encode(encryptedToken);
    var authToken = base64.encode(tokenBytes);
    return authToken;
};

var guestAuthTokenGenerator = function(req, res){
    reqObj = req.body;
    var date = new Date();
    var todayDate = dateformat(date, "yyyy-mm-dd");
    var expireDate = dateformat(date.setTime( date.getTime() + 1 * 86400000 ), "yyyy-mm-dd");
    var guest= {
        user_name: reqObj.mid,
        created_date: todayDate,
        expire_date: expireDate
    };
    var encryptedToken = encrypt.encryptData(JSON.stringify(guest));
    var tokenBytes = utf8.encode(encryptedToken);
    var authToken = base64.encode(tokenBytes);
    res.status(200).json({
        auth_token: authToken
    });
};

var userAuthTokenValidator = function(token){
    var tokenBytes = base64.decode(token);
    var tokenText = utf8.decode(tokenBytes);
    var decryptedToken = decrypt.decryptData(tokenText);
    return decryptedToken;
};

module.exports = {
    userAuthTokenGenerator: userAuthTokenGenerator,
    guestAuthTokenGenerator: guestAuthTokenGenerator,
    userAuthTokenValidator: userAuthTokenValidator
}