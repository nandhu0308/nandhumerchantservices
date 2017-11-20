const sequelize = require('sequelize');
const db = require('./../../db');

const AssignAdEvents = db.define('assign_logo_ads', {
  
    logo_ad_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    ad_event_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    
    time_slot: {
        type: sequelize.STRING(20),
        allowNull: false
    },   

    ad_placement: {
        type: sequelize.ENUM('TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'MIDDLE_LEFT', 'MIDDLE_CENTER', 'MIDDLE_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT'),
        allowNull: false
    },

    ad_target: {
        type: sequelize.STRING(100),
        allowNull: false
    },

    geo_x_coordinate: {
        type: sequelize.STRING(50),
        allowNull: false
    },

    geo_y_coordinate: {
        type: sequelize.STRING(50),
        allowNull: false
    },

    logo_ftp_path: {
        type: sequelize.STRING(1000),
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

module.exports = AssignAdEvents;