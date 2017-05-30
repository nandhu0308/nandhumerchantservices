var base64 = require('base-64');
var utf8 = require('utf8');
var encrypt = require('./../aes-services/encrypt')

var userAuthTokenGenerator = function(user){
    var encryptedToken = encrypt.encryptData(user);
    var tokenBytes = utf8.encode(encryptedToken);
    var authToken = base64.encode(tokenBytes);
    return authToken;
};

module.exports = {
    userAuthToken: userAuthTokenGenerator
}