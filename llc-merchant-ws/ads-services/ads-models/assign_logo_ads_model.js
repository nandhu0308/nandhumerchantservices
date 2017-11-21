const sequelize = require('sequelize');
const db = require('./../../db');

const AssignLogoAds = db.define('assign_logo_ads', {
    logo_ad_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ad_event_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    time_slot: {
        type: sequelize.STRING,
        allowNull: false
    },
    ad_placement: {
        type: sequelize.ENUM('TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'MIDDLE_LEFT', 'MIDDLE_CENTER', 'MIDDLE_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT'),
        allowNull: false
    },
    ad_target: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = AssignLogoAds;