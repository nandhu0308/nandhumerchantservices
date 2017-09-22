var Journal = require('./../journalModels/journalModel');
var JournalSettings = require('./../journalModels/journalSettingModel');
var dateformat = require('dateformat');
var UserAuthServices = require('./../../util-services/sessions-services/userAuthServices');
var TokenValidator = require('./../../user/services/tokenValidator');
// var BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');

var getJournals = function (req, res) {

    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);

    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {

        if (userSessions.length === 1) {

            if (expireDate >= todayDate) {
                Journal.findAll({
                    where: {
                        is_active: true
                    }
                }
                ).then(function (Journal) {
                    res.status(200).json(Journal);
                }).catch(function (err) {
                    res.status(404).json({
                        message: 'NO channels found..'
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

var getJournalSettings = function (req, res) {
    appln_name = req.params.appln_name;
    stream_name = req.params.stream_name;
    JournalSettings.findOne({
        where: {
            appln_name: appln_name,
            stream_name: stream_name
        }
    }).then(jsettings => {
        res.status(200).json(jsettings);
    }).catch(err => {
        res.status(500).json({
            error: err,
            message: 'Something went wrong'
        });
    });
};

module.exports = {
    getJournals: getJournals,
    getJournalSettings: getJournalSettings
};
    