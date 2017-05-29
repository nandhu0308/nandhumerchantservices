const sequelize = require('sequelize');
const db = require('./../../db');

const Applications = db.define('applications', {
    application_name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    application_short_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.STRING
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
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
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

module.exports = Applications;