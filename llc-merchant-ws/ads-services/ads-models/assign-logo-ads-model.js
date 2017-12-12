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

    time_slot_start: {
        type: sequelize.STRING(20),
        allowNull: false
    },

    time_slot_end: {
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

    ad_type: {
        type: sequelize.ENUM('LOGO', 'L_BAND', 'BOTTOM_BAR', 'SLIDE', 'VIDEO'),
        allowNull: false,
        defaultValue: 'LOGO'
    },

    logo_ftp_path: {
        type: sequelize.STRING(1000),
        allowNull: false
    },
    img_name: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    lower_text: {
        type: sequelize.STRING(500)
    },
    stream_source: {
        type: sequelize.ENUM('Source', '720p'),
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
    },
    txt_pos_top:    {
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    txt_pos_bottom:    {
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    txt_pos_left:    {
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    txt_pos_right:    {
        type:sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    }

}, {
        timestamps: false,
        freezeTableName: true
    });

module.exports = AssignAdEvents;