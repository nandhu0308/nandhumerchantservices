const sequelize = require('sequelize');
const db = require('./../../db');
const Broadcaster = require('./../broadcasterModels/broadcastersModel');
const BroadcasterChannelCategory = db.define('broadcast_channel_category' , {
    
    category_name:{
         type: sequelize.STRING(50),
        allowNull: false

    },
    description:{
        type:sequelize.STRING(100),
         allowNull: false
    },
    is_active:{
         type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

module.exports = BroadcasterChannelCategory;
