const sequelize = require('sequelize');
const db = require('./../../db');
const ChannelCategory = require('./../broadcasterModels/channelCategoryModel');
const BroadcasterVideos = db.define('broadcaster_videos', {
    broadcaster_channel_id: {
        type: sequelize.INTEGER,
         references:{
            model:ChannelCategory,
            key:"id"
        },
        allowNull: false
    },  
   
    video_name : {
        type : sequelize.STRING,
        allowNull : false
    },

     rank: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    video_thumbnail : {
        type : sequelize.STRING(1000)
    },
   
    video_description : {
        type : sequelize.TEXT
       
    },
    video_url : {
        type : sequelize.STRING(1000),
        allowNull: false
    },
    
    is_active : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    is_live : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },

    is_youtube : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },

    yt_streamkey : {
        type : sequelize.STRING(100),
        defaultValue : ''
    },

    fb_streamkey : {
        type : sequelize.STRING(100),
        defaultValue : ''
    },

    ha_streamkey : {
        type : sequelize.STRING(100),
        defaultValue : ''
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
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = BroadcasterVideos;