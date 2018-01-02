const sequelize = require('sequelize');
const db = require('./../../db');

const ApplicationUsers = db.define('application_users', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    user_type: {
        type: sequelize.ENUM,
        values: ['eCommerce', 'Restaurant', 'Entertainment', 'User', 'Super Admin','eUser'],
        allowNull: false
    },
    user_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    user_short_name: {
        type: sequelize.STRING
    },
    country: {
        type: sequelize.STRING
    },
    city: {
        type: sequelize.STRING
    },
    zip: {
        type: sequelize.STRING
    },
    country_iso_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    device_id: {
        type: sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: sequelize.STRING,
        allowNull: false
    },
    email_id: {
        type: sequelize.STRING,
        allowNull: false
    },
    passwd: {
        type: sequelize.STRING,
        allowNull: false
    },
    client_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_anonymous: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false
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
    last_updated_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    last_updated_on: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    utm_source: {
        type: sequelize.STRING
    },
    utm_medium: {
        type: sequelize.STRING
    },
    utm_campign: {
        type: sequelize.STRING
    },
    utm_term: {
        type: sequelize.STRING
    },
    utm_content: {
        type: sequelize.STRING
    },
    app_version: {
        type: sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ApplicationUsers;