const sequelize = require('sequelize');
const db = require('./../../db');

const Journals = db.define('journal', {
    channel_id: {
        type: sequelize.INTEGER(11),
        allownull: false
    },

    email: {
        type: sequelize.STRING(140),
        allownull: false
    },

    password: {
        type: sequelize.STRING(80),
        allownull: false
    },

    emp_id: {
        type: sequelize.STRING(10),
        allownull: false
    },

    first_name: {
        type: sequelize.STRING(15),
        allownull: false
    },

    last_name: {
        type: sequelize.STRING(15),
        allownull: false
    },

    mobile: {
        type: sequelize.STRING(10),
        allownull: false
    },
    is_active: {
        type: sequelize.BOOLEAN,
        allownull: false,
        defaultValue: true
    },
    is_deleted: {
        type: sequelize.BOOLEAN,
        allownull: false,
        defaultValue: false
    },

    created_by: {
        type: sequelize.STRING(50),
        allownull: false
    },

    updated_by: {
        type: sequelize.STRING(50),
        allownull: false
    },

    created_time: {
        type: sequelize.DATE,
        allownull: false
    },

    updated_time: {
        type: sequelize.DATE,
        allownull: false
    }
}, {
        timestamps: false,
        freezeTableName: true
    })

module.exports = Journals;