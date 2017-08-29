const sequelize = require('sequelize');
const db = require('./../../db');

const LanguageInfo = db.define('language_info', {
    lang_name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }, 
    lang_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.STRING
    }, 
    is_active: {
        type: sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = LanguageInfo;