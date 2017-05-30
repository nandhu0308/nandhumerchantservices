const sequelize = require('sequelize');
const db = require('./../../db');

const UserAddresses = db.define('user_addresses', {
    customer_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    seller_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    address_line1: {
        type: sequelize.STRING,
        allowNull: false
    },
    address_line2: {
        type: sequelize.STRING
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    state: {
        type: sequelize.STRING,
        allowNull: false
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: sequelize.STRING,
        allowNull: false
    },
    landmark: {
        type: sequelize.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = UserAddresses;