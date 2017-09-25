const sequelize = require('sequelize');
const db = require('./../../db');

const JournalSetting = db.define('journal_setting', {

    journal_id: {
        type: sequelize.INTEGER(11),
        allownull: false
    },

    journal_setting_id: {
        type: sequelize.INTEGER(10),
        allowNull: false
    },

    language_id: {
        type: sequelize.INTEGER(11),
        allownull: false
    },

    appln_name: {
        type: sequelize.STRING(200),
        allownull: false,
        defaultValue: ''
    },

    host_url: {
        type: sequelize.STRING(500),
        allownull: false,
        defaultValue: ''
    },

    host_port: {
        type: sequelize.STRING(4),
        allownull: false,
        defaultValue: ''
    },
    stream_name: {
        type: sequelize.STRING(50),
        allownull: false,
        defaultValue: ''
    },

    suname: {
        type: sequelize.STRING(50),
        allownull: false,
        defaultValue: ''
    },

    spwd: {
        type: sequelize.STRING(50),
        allownull: false,
        defaultValue: ''
    },

    rep_mac_addr: {
        type: sequelize.STRING(200),
        allownull: false,
        defaultValue: ''
    },

    output_url_hls: {
        type: sequelize.STRING(1000),
        allownull: false,
        defaultValue: ''
    },

    output_url_rtsp: {
        type: sequelize.STRING(1000),
        allownull: false,
        defaultValue: ''
    },

    is_record: {
        type: sequelize.BOOLEAN,
        allownull: false,
        defaultValue: true
    },

    is_upload: {
        type: sequelize.BOOLEAN,
        allownull: false,
        defaultValue: true
    },

    is_active: {
        type: sequelize.INTEGER(11),
        allownull: false,
        defaultValue: true
    },

    created_by: {
        type: sequelize.STRING(255),
        allownull: false
    },

    updated_by: {
        type: sequelize.STRING(255),
        allownull: false
    },

    created_time: {
        type: sequelize.DATE,
        allownull: false,
        defaultValue: sequelize.NOW
    },

    updated_time: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },

    ftp_host: {
        type: sequelize.STRING(100),
        allowNull: false
    },

    ftp_port: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    ftp_uname: {
        type: sequelize.STRING(100),
        allowNull: false
    },

    ftp_passwd: {
        type: sequelize.STRING(80)
    },

    ftp_path: {
        type: sequelize.STRING(200),
        allowNull: false
    }
}, {
        timestamps: false,
        freezeTableName: true
    })

module.exports = JournalSetting;