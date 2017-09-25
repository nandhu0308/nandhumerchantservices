var JournalDevices = require('./../journalModels/journalDevicesModel');

var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');

var getJournalDevices = function (req, res) {
    
        authToken = req.headers.authorization;
        userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
        var todayDate = new Date();
        var expireDate = new Date(userAuthObj.expire_date);
  
        tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
           
            if (userSessions.length === 1) {
               
                if (expireDate >= todayDate) {
                    JournalDevices.findAll({
                        where: {
                            is_active: true
                        }
                    }
                    ).then(function (journalDevice) {
                        res.status(200).json(journalDevice);
                        console.log('sucess',journalDevice);
                    }).catch(function (err) {
                        res.status(404).json({
                            message: 'NO Devices found..'
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
        getJournalDevices : getJournalDevices
       
    };
    