const sequelize = require('sequelize');
const db = require('./../../db');

const ProductSubcategory = db.define('product_subcategory', {
    subcategory_name : {
        type : sequelize.STRING,
        allowNull : false
    },
    subcategory_decription : {
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
    is_active : {
        type : sequelize.BOOLEAN,
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
    upadted_by : {
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