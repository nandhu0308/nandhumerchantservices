const sequelize = require('sequelize');
const db = require('./../../db');

const Broadcaster = db.define('broadcasters', {
    user_id: {
        type: sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    broadcaster_name: {
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: sequelize.STRING(1000)
    },
    short_description: {
        type: sequelize.STRING
    },
    broadcaster_thumbnail: {
        type: sequelize.STRING(1000),
        allowNull: false,
        defaultValue: ''
    },
    broadcaster_banner: {
        type: sequelize.STRING(1000),
        allowNull: false,
        defaultValue: ''
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

module.exports = Broadcaster;