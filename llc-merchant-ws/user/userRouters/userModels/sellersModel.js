const sequelize = require('sequelize');
const db = require('./../../db');

const ApplicationSellers = db.define('application_seller', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    seller_shop_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    about_shop: {
        type: sequelize.STRING(3000)
    },
    shop_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    seller_location_latitude: {
        type: sequelize.DECIMAL(10,6),
        defaultValue: 0.000000
    },
    seller_location_longitude: {
        type: sequelize.DECIMAL(10,6),
        defaultValue: 0.000000
    },
    seller_kyc_doc_type: {
        type: sequelize.STRING
    },
    seller_kyc_doc_value: {
        type: sequelize.STRING
    },
    is_deleted: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    created_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    created_time: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    updated_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    updated_time: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = ApplicationSellers;