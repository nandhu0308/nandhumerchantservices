const sequelize = require('sequelize');
const db = require('./../../db');

const BroadcasterLanguage = db.define('broadcaster_language', {
    language: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = BroadcasterLanguage;