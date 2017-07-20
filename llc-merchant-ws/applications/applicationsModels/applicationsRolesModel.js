const sequelize = require('sequelize');
const db = require('./../../db');

const ApplicationRoles = db.define('application_roles', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    role_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
}, {
        timestamps: false,
        freezeTableName: true
});

module.exports = ApplicationRoles;