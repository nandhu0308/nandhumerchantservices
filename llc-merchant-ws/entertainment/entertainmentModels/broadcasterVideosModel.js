const sequelize = require('sequelize');
const db = require('./../../db');

const BroadcasterVideos = db.define('broadcaster_video', {
    album_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    category_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    language_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    broadcaster_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    video_name: {
        type: sequelize.STRING(500),
        allowNull: false
    },
    video_description: {
        type: sequelize.TEXT
    },
    video_short_description: {
        type: sequelize.STRING
    },
    video_url: {
        type: sequelize.STRING(1000),
        allowNull: false,
        unique: true
    },
    video_thumbnail_url: {
        type: sequelize.STRING
    },
    is_youtube: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    created_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    created_on: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    updated_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    updated_on: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    }
}, {
    timestamps: false,
    freezeTableName: false
});

module.exports =  BroadcasterVideos;