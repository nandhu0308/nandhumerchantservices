const sequelize = require('sequelize');
const db = require('./../../db');

const BroadcasterCategory = db.define('broadcaster_category', {
    category_name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize.STRING(1000)
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BroadcasterCategory;