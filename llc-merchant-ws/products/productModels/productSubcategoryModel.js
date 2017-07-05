const sequelize = require('sequelize');
const db = require('./../../db');
const ProductCategory = require('./productCategoryModel');

const ProductSubcategory = db.define('product_subcategory', {
    subcategory_name : {
        type : sequelize.STRING,
        allowNull : false
    },
    subcategory_description : {
        type : sequelize.TEXT
    },
    category_id : {
        type : sequelize.INTEGER,
        allowNull : false
    },
    subcategory_image : {
        type : sequelize.STRING(1000),
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

module.exports = ProductSubcategory;