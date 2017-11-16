const sequelize = require('sequelize');
const db = require('./../../db');

const LogoAds = db.define('logo_ads', {
    broadcaster_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    channel_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    image_url: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    image_dimensions: {
        type: sequelize.STRING,
        allowNull: false
    },
    ad_time_slots: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    target_platforms: {
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

module.exports = LogoAds;