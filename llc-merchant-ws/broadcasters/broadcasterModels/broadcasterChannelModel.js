const sequelize = require('sequelize');
const db = require('./../../db');
const Broadcaster = require('./../broadcasterModels/broadcastersModel');
const BroadcasterChannelCategory = require('./../broadcasterModels/broadcasterChannelCategoryModel');
const BroadcasterChannel = db.define('broadcaster_channel' , {
    
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },

   
    broadcaster_id: {
        type: sequelize.INTEGER,

        references:{
            model:Broadcaster,
            key:"id"
        },
        allowNull: false
    },

     category_id: {
        type: sequelize.INTEGER,

        references:{
            model:BroadcasterChannelCategory,
            key:"id"
        },
        allowNull: false
    },
   
    channel_name : {
        type : sequelize.STRING(100),
        allowNull : false
    },
    yt_streamtarget_name : {
        type : sequelize.STRING(100),
        allowNull : false
    },



    fb_streamtarget_name : {
        type : sequelize.STRING(100),
        allowNull : false
    },
   

   ha_streamtarget_name : {
        type : sequelize.STRING(100),
        allowNull : false
    },
   
   
    channel_image : {
        type : sequelize.STRING(500),
        allowNull : false,
        defaultValue : ''
    },
    image_file_name : {
        type : sequelize.STRING(500),
        allowNull: false
    },

     rank: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    
    is_active : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
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
    },
     lang_id:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    is_hd : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    ha_rank : {
        type : sequelize.INTEGER,
        allowNull : false
       
    },
    ha_is_active : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    deprecated : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = BroadcasterChannel;