const sequelize = require('sequelize');
const db = require('./../../db');

const UserSessions = db.define('user_sessions', {
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    user_type: {
        type: sequelize.ENUM,
        values: ['Seller', 'User', 'SA'],
        allowNull: false
    },
    session_key: {
        type: sequelize.TEXT
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    expire_date: {
        type: sequelize.DATE,
        allowNull: false
    },
    created_on: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
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

module.exports = UserSessions;