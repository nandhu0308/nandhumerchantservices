const sequelize = require('sequelize');
const db = require('./../../db');
const BroadcasterDestination = db.define('broadcaster_destination' , {

    d_id:{
        type: sequelize.INTEGER(11),
        allowNull: false
   },

    broadcaster_channel_id: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    destination_name:{
         type: sequelize.STRING(50),
        allowNull: false

    },
    description:{
        type:sequelize.STRING(1000),
         allowNull: false
    },
    is_active:{
         type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : '1'
    },
    destination_image:{
        type:sequelize.STRING(1000),
        allowNull:true,
        defaultValue:''   
    }
},{
    timestamps : false,
    freezeTableName : true
})

module.exports = BroadcasterDestination;
