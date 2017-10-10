var JournalDevices = require('./../journalModels/journalDevicesModel');
var JournalSettings = require('./../journalModels/journalSettingModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');


var getAllJournalDevices = function (req, res) {
    
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

var updateJournalDevice = function (req, res) {
    reqObj = req.body;
        JournalDevices.findOne({
            where: 
            {
                 journal_setting_id: reqObj.journal_setting_id,
                 is_active: true
                   
            },
             attributes:
              {
                exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']
                   
               }
            }).then(function (journalDevices) {
                if (journalDevices) {
                    journalDevices.updateAttributes({
                            mac_id: reqObj.mac_id
                        }).then(function () {
                            res.status(200).json(
                                {
                                    id:journalDevices.id
                                });
                        }).catch(function (err) {
                            res.status(500).json({
                                error: err,
                                message: 'device update failed...'
                            });
                        });
                    }
                    else {
                        res.status(404).json({
                            message: 'device not found...'
                        });
                    }
                }).catch(function (err) {
                    res.status(500).json({
                        error: err,
                        message: 'something went wrong...'
                    });
               });
     
};





module.exports = {
    getAllJournalDevices : getAllJournalDevices,
    updateJournalDevice : updateJournalDevice
       
};
    