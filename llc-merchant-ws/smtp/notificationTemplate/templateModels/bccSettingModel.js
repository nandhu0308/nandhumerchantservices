const sequlize = require('sequelize');
const db = require('./../../../db');
const BccSetting = db.define('ha_bcc_setting',{
    bcc_id:{
        type:sequlize.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    bcc_setting:{
        type:sequlize.STRING(200),
        allowNull:false

    },
    cc_setting:{
        type:sequlize.STRING(200),
        allowNull:false

    }
},{
    timestamps:false,
    freezeTableName:true

})
module.exports=BccSetting;