const sequelize = require('sequelize');
const db = require('./../../db');

const ApplicationUsers = db.define('application_users', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    user_type: {
        type: sequelize.ENUM,
        values: ['eCommerce', 'Restaurant', 'Entertainment', 'User'],
        allowNull: false
    },
    seller_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    device_mac: {
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
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ApplicationUsers;