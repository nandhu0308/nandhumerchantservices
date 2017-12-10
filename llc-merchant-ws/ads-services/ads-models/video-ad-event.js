const sequelize = require('sequelize');
const db = require('./../../db');

const VideoAdEvent = db.define("video_ad_event", {
    channel_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    event_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    date: {
        type: sequelize.DATE,
        allowNull: false
    },
    no_of_ads: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    start_time: {
        type: sequelize.STRING,
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
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    updated_on: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
}, {
        timestamps: false,
        freezeTableName: true
    });

module.exports = VideoAdEvent;