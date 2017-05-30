var aesjs = require('aes-js');

var encryptData = function(jsonData){
    var key = [10,11,19,91,27,11,19,94,5,6,19,95,1,7,19,91];
    var textBytes = aesjs.utils.utf8.toBytes(jsonData);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    return encryptedHex;
};

module.exports = {
    encryptData: encryptData
};