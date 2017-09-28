const sequelize = require('sequelize');
const db = require('./../../db');
const JournalSettings = require('./../journalModels/journalSettingModel');

const JournalDevices = db.define('journal_devices',{
   
    journal_setting_id: {
        type: sequelize.INTEGER(10),
        allowNull: false
    journal_setting_id:{
        type:sequelize.INTEGER(10),
        references : {
            model :JournalSettings,
            key : "id"
        },
        allownull:false
    },

    mac_id:{
        type:sequelize.STRING(40),
        allownull:false
    },
   

    is_active:{
        type:sequelize.BOOLEAN,
        allownull:false,
        defaultValue : true
    },
   
    created_by:{
        type:sequelize.STRING(50),
        allownull:false
    },
   

    updated_by:{
        type:sequelize.STRING(50),
        allownull:false
    },
   
    created_time:{
        type:sequelize.DATE,
        allownull:false,
        defaultValue : sequelize.NOW
    },

    updated_time:{
        type:sequelize.DATE,
        allownull:false,
        defaultValue : sequelize.NOW
    }
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = JournalDevices;
   
   
   


