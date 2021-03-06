const sequelize = require('sequelize');
const db = require('./../../db');

const ApplicationRoleModules = db.define('application_role_module', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    module_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    role_id: {
        type: sequelize.INTEGER,
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

module.exports = ApplicationRoleModules;