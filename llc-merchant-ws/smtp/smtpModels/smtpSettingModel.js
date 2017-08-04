const sequelize = require('sequelize');
const db = require('./../../db');

const SmtpSetting = db.define('smtp_setting',{
    smtp_host:{
        type:sequelize.STRING(500),
        allownull:false
    },
    smtp_port:{
        type:sequelize.INTEGER,
        allownull:false
    },
    smtp_auth:{
        type:sequelize.BOOLEAN,
        allownull:false
    },
    smtp_username99:{
        type:sequelize.STRING(500),
        defaultValue:'transactions@limitlesscircle.com'
    },
    smtp_password99:{
        type:sequelize.STRING(500),
        defaultValue:'Engage@12E'
    },
    is_active:{
        type:sequelize.BOOLEAN,
        allownull:false
    },
    created_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    created_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    updated_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    }
},{
    timestamps:false,
    freezeTableName:true
})
module.exports=SmtpSetting;