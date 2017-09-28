var Journal = require('./../journalModels/journalModel');
var JournalSettings = require('./../journalModels/journalSettingModel');
var JournalSettingLog = require('./../journalModels/journalSettingLogModel');
var JournalDevice = require('./../journalModels/journalDevicesModel');
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
        console.log(jsettings);
        res.status(200).json(jsettings);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
            message: 'Something went wrong'
        });
    });
};

var logJournalActivity = function (req, res) {
    reqObj = req.body;
    JournalSettingLog.create({
        journal_setting_id: reqObj.journal_setting_id,
        language_id: reqObj.language_id,
        appln_name: reqObj.appln_name,
        host_url: reqObj.host_url,
        host_port: reqObj.host_port,
        stream_name: reqObj.stream_name,
        spwd: reqObj.spwd,
        rep_mac_addr: reqObj.rep_mac_addr,
        output_url_hls: reqObj.output_url_hls,
        output_url_rtsp: reqObj.output_url_rtsp,
        is_record: reqObj.is_record,
        is_upload: reqObj.is_upload,
        is_active: reqObj.is_active,
        created_by: reqObj.created_by,
        updated_by: reqObj.updated_by,
        created_time: reqObj.created_time,
        updated_time: reqObj.updated_time,
        ftp_host: reqObj.ftp_host,
        ftp_port: reqObj.ftp_port,
        ftp_uname: reqObj.ftp_uname,
        ftp_passwd: reqObj.ftp_passwd,
        ftp_path: reqObj.ftp_path,
        bucket_path: reqObj.bucket_path
    }).then(journalLog => {
        res.status(200).json({
            id: journalLog.id,
            message: 'success'
        });
    }).catch(function (err) {
        res.status(500).json({
            message: 'Couldnt create application. Something went wrong...',
            err_description: err
        });
    });
};

var getJournalsByChannelId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                channelId = req.params.channelId;
                Journal.findAll({
                    where: {
                        channel_id: channelId
                    },
                    attributes: {
                        exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']
                    }
                }).then(journalList => {
                    console.log(journalList.length);
                    res.status(200).json(journalList);
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Something went wrong!'
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

getJournalSettingsByJournalId = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                journalId = req.params.journalId;
                JournalSettings.findAll({
                    where: {
                        journal_id: journalId
                    },
                    attributes: {
                        exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']
                    }
                }).then(settings => {
                    res.status(200).json(settings);
                }).catch(err => {
                    res.status(500).json({
                        error: err,
                        message: 'Something is wrong!'
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
var createJournal = function (req, res) {
    reqObj = req.body;
    Journal.create({
        id: reqObj.id,
        email: reqObj.email,
        password:reqObj.password,
        emp_id: reqObj.emp_id,
        first_name: reqObj.first_name,
        last_name: reqObj.last_name,
        mobile: reqObj.mobile,
        is_active: reqObj.is_active,
        created_by: reqObj.created_by,
        updated_by: reqObj.updated_by,
        created_time: reqObj.created_time,
        updated_time: reqObj.updated_time
    }).then(journal => {
        res.status(200).json({
            id: journal.id,
            message: 'success'
        });
    }).catch(function (err) {
        res.status(500).json({
            message: 'Couldnot create journal. Something went wrong...',
            err_description: err
        });
    });
};



        });
    });
};

getJournalDevice = function (req, res) {
    authToken = req.headers.authorization;
    userAuthObj = JSON.parse(UserAuthServices.userAuthTokenValidator(authToken));
    var todayDate = new Date();
    var expireDate = new Date(userAuthObj.expire_date);
    tokenOK = TokenValidator.validateToken(userAuthObj.user_id, authToken).then(function (userSessions) {
        if (userSessions.length === 1) {
            if (expireDate >= todayDate) {
                settingId = req.params.settingId;
                JournalDevice.findOne({
                    where: {
                        journal_setting_id: settingId,
                        is_active: true
                    },
                    attributes: {
                        exclude: ['created_by', 'updated_by', 'created_time', 'updated_time']
                    }
                }).then(device => {
                    res.status(200).json(device);
                }).catch(err => {
                    res.status.json({
                        error: err,
                        message: 'Somethinga went wrong'
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

module.exports = {
    getJournals: getJournals,
    getJournalSettings: getJournalSettings,
    logJournalActivity: logJournalActivity,
    getJournalsByChannelId: getJournalsByChannelId,
    getJournalSettingsByJournalId: getJournalSettingsByJournalId,
    getJournalDevice: getJournalDevice
    getJournalsByChannelId: getJournalsByChannelId,
    createJournal : createJournal,
    
};
