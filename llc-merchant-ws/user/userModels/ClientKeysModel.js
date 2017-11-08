const sequelize = require('sequelize');
const db = require('./../../db');

const ClientKeys = db.define('google_client_keys', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    client_id: {
        type: sequelize.STRING(500),
        allowNull: false
    },
    client_secret: {
        type: sequelize.STRING(500),
        allowNull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
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

module.exports = ClientKeys;