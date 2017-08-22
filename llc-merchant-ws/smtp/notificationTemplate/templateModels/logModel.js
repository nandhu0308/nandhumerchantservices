const sequlize = require('sequelize');
const db = require('./../../../db');
const LogController = db.define('notification_log',{
    template_id:{
        type:sequlize.INTEGER,
        allowNull:false
    },
    is_sent:{
        type:sequlize.BOOLEAN,
        allowNull:true

    },
    message:{
        type:sequlize.STRING(50),
        allowNull:true

    }
},{
    timestamps:false,
    freezeTableName:true

})
module.exports=LogController;