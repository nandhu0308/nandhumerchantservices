const sequelize = require('sequelize');
const db = require('./../../db');

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
        type : sequelize.TEXT,
        defaultValue : ''
    },
    product_image : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
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
    image1 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image2 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image3 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image4 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image5 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image6 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image7 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image8 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image9 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
    },
    image10 : {
        type : sequelize.STRING(1000),
        defaultValue : '',
        allowNull : false
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