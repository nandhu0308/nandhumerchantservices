const sequelize = require('sequelize');
const db = require('./../../db');

const BroadcasterAlbums = db.define('broadcaster_albums', {
    broadcaster_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    category_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    language_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    album_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    album_description: {
        type: sequelize.STRING(1000)
    },
    album_thumbnail: {
        type: sequelize.STRING(1000),
        defaultValue: ''
    },
    total_album_videos: {
        type: sequelize.INTEGER,
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
    freezeTableName: true
});

module.exports = BroadcasterAlbums;