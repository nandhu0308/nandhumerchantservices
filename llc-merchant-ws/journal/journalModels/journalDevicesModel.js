const sequelize = require('sequelize');
const db = require('./../../db');

const JournalSetting = db.define('journal_setting', {

    journal_id: {
        type: sequelize.INTEGER(10),
        allownull: false
    },

    mac_id: {
        type: sequelize.STRING(40),
        allownull: false
    },


    is_active: {
        type: sequelize.BOOLEAN,
        allownull: false,
        defaultValue: true
    },


    journal_id: {
        type: sequelize.INTEGER(10),
        allownull: false
    },


    created_by: {
        type: sequelize.STRING(50),
        allownull: false
    },


    updated_by: {
        type: sequelize.STRING(50),
        allownull: false
    },

    created_time: {
        type: sequelize.DATE,
        allownull: false,
    },

    updated_time: {
        type: sequelize.DATE,
        allownull: false,
    },


