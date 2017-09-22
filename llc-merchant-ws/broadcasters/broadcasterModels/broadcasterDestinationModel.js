const sequelize = require('sequelize');
const db = require('./../../db');
const BroadcasterDestination = db.define('broadcaster_destination' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
//     d_id:{
//         type: sequelize.INTEGER,
//         allowNull: false
//    },

    // broadcaster_channel_id: {
    //     type: sequelize.INTEGER,
    //     allowNull: false
    // },
    destination_name:{
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

module.exports = BroadcasterDestination;
