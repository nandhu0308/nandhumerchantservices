const sequelize = require('sequelize');
const db = require('./../../db');
const Applications = require('./applicationsModel');

const ApplicationModules = db.define('application_modules', {
    application_id: {
        type: sequelize.INTEGER,
        references: {
            model: Applications,
            key: 'id'
        },
        allowNull: false
    },
    module_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    module_title: {
        type: sequelize.STRING
    },
    module_path: {
        type: sequelize.STRING
    },
    load_children: {
        type: sequelize.STRING,
        allowNull: false
    },
    module_date: {
        type: sequelize.STRING,
        allowNull: false
    },
    data_icon: {
        type: sequelize.STRING,
        allowNull: false
    },
    module_parentid: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    disp_sequence: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    is_read: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    is_denied: {
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

module.exports = ApplicationModules;