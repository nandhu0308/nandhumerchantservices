const sequelize = require('sequelize');
const db = require('./../../db');

const AdEvents = db.define('ad_events', {
  
    channel_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    
    event_name: {
        type: sequelize.STRING(100),
        allowNull: false
    },   

    event_type: {
        type: sequelize.ENUM('Short Event','24x7','VoD'),
        allowNull: false
    },

    duration: {
        type: sequelize.STRING,
        allowNull: false
    },

    date: {
        type: sequelize.DATE,
        allowNull: false
    },

    ad_type: {
        type: sequelize.ENUM('LOGO', 'VIDEO', 'L-BAND', 'SLIDE', 'BOTTOM-BAR'),
        allowNull: false,
        defaultValue: 'LOGO'
    },

    start_time: {
        type: sequelize.STRING(20),
        allowNull: false
    },

    end_time: {
        type: sequelize.STRING(20),
        allowNull: false
    },

    ad_window_time_pa: {
        type: sequelize.INTEGER,
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

module.exports = AdEvents;