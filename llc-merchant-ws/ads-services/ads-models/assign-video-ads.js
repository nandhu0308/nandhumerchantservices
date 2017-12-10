const sequelize = require('sequelize');
const db = require('./../../db');

const AssignVideoAds = db.define("assign_video_ad", {
    video_ad_event_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    video_ad_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ad_length: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ad_target: {
        type: sequelize.STRING,
        allowNull: false
    },
    video_ftp_path: {
        type: sequelize.STRING,
        allowNull: false
    },
    video_name: {
        type: sequelize.STRING,
        allowNull: false
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

module.exports = AssignVideoAds;