const sequelize = require('sequelize');
const db = require('./../../db');
const BroadcasterChannel = require('./../broadcasterModels/broadcasterChannelModel');
const BroadcasterVideos = db.define('broadcaster_videos', {
    broadcaster_channel_id: {
        type: sequelize.INTEGER,
         references:{
            model:BroadcasterChannel,
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
    url : {
        type : sequelize.STRING(1000),
        allowNull: false
    },

    duration: {
        type: sequelize.INTEGER,
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

    live_ads : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },

    p160 : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },

    p360 : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    p720 : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    p1080 : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    p_uhd : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },

     video_type : {
        type : sequelize.STRING(10),
        defaultValue : ''
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
    video_created_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    video_updated_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    }
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = BroadcasterVideos;