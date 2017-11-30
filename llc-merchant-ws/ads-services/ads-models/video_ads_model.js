const sequelize = require('sequelize');
const db = require('./../../db');

const VideoAds = db.define("ha_video_ads", {
    broadcaster_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    channel_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ad_title: {
        type: sequelize.STRING,
        allowNull: false
    },
    ad_length: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    video_url: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    ftp_path: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    created_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    updated_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    created_on: {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_on: {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = VideoAds;