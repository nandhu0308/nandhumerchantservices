const sequelize = require('sequelize');
const db = require('./../../db');

const AdEvent = db.define('ad_events', {
    event_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    event_type: {
        type: sequelize.ENUM('Short Event', '24x7', 'VoD'),
        allowNull: false
    },
    ad_type: {
        type: sequelize.ENUM('LOGO', 'VIDEO', 'L-BAND', 'BOTTOM-BAR', 'SLIDE'),
        allowNull: false
    },
    duration: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    start_time: {
        type: sequelize.STRING,
        allowNull: false
    },
    end_time: {
        type: sequelize.STRING,
        allowNull: false
    },
    ad_window_time_pa: {
        type: sequelize.INTEGER,
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

module.exports = AdEvent;