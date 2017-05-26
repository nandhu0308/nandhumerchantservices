const sequelize = require('sequelize');
const db = require('./../../db');
const Applications = require('./applicationsModel');

const ApplicationRoles =  db.define('application_roles', {
    application_id: {
        type: sequelize.INTEGER,
        references: {
            model: Applications,
            key: 'id'
        },
        allowNull: false
    },
    role_type: {
        type: sequelize.ENUM,
        values: ['eCommerce', 'Restaurant', 'FreeAirTV', 'None']
    },
    role_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    role_short_name: {
        type: sequelize.STRING
    },
    decsription: {
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