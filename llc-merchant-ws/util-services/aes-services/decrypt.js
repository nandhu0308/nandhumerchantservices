var aesjs = require('aes-js');

var decryptData = function(encryptedData){
    var key = [10,11,19,91,27,11,19,94,5,6,19,95,1,7,19,91];
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedData);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    return decryptedText;
};

module.exports = decryptData;