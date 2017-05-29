const sequelize = require('sequelize');
const db = require('./../../db');
const ProductCategory = require('./productCategoryModel');
const ProductSubcategory = require('./productsubcategoryModel');

const Products = db.define('products' ,{
    category_id : {
        type : sequelize.INTEGER,
        allowNull : false
    },
    subcategory_id : {
        type : sequelize.INTEGER,
        allowNull : false
    },
    product_name : {
        type : sequelize.STRING,
        allowNull : false,
        defaultValue : ''
    },
    product_price : {
        type : sequelize.FLOAT,
        allowNull : false,
        defaultValue : 0
    },
    discount_rate : {
        type : sequelize.FLOAT,
        allowNull : false,
        defaultValue : 0
    },
    product_descripton : {
        type : sequelize.TEXT
    },
    product_size_text : {
        type : sequelize.STRING
    },
    product_size_number : {
        type : sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    },
    product_color : {
        type : sequelize.STRING
    },
    is_removed : {
        type : sequelize.BOOLEAN,
        defaultValue : true,
        allowNull : false
    },
    pod : {
        type : sequelize.BOOLEAN,
        defaultValue : true,
        allowNull : false
    },
    add_to_cart : {
        type : sequelize.BOOLEAN,
        defaultValue : true,
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
});

module.exports = Products;