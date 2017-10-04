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


    var createJournalDevice = function (req, res) {
        reqObj = req.body;
        JournalDevices.create({
            journal_setting_id:reqObj.journal_setting_id,
            mac_id: reqObj.mac_id,
            is_active: reqObj.is_active,
            created_by: reqObj.created_by,
            updated_by: reqObj.updated_by,
            created_time: reqObj.created_time,
            updated_time: reqObj.updated_time
        }).then(journalDevice => {
            res.status(200).json({
                id: journalDevice.id,
                message: 'success'
            });
        }).catch(function (err) {
            res.status(500).json({
                message: 'Couldnot create journal device. Something went wrong...',
                err_description: err
    
    
            });
        });
    };

    module.exports = {
        getJournalDevices : getJournalDevices,
        createJournalDevice : createJournalDevice
       
    };
    