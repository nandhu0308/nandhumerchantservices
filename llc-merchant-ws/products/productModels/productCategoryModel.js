const sequelize = require('sequelize');
const db = require('./../../db');

const ProductCategory = db.define('product_category', {
    application_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    category_name : {
        type : sequelize.STRING,
        allowNull : false
    },
    category_description : {
        type : sequelize.TEXT
    },
    seller_id : {
            type : sequelize.INTEGER,
            allowNull : false
    },
    category_image : {
        type : sequelize.STRING(1000),
        allowNull : false,
        defaultValue : ''
    },
    image_file_name : {
        type : sequelize.STRING(500),
        allowNull: false
    },
    is_active : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    created_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    created_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    updated_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    }
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = ProductCategory;