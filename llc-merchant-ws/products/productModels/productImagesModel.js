const sequelize = require('sequelize');
const db = require('./../../db');

const ProductImages = db.define('product_images', {
    product_id : {
        type : sequelize.INTEGER,
        allowNull : false
    },
    image_url : {
        type : sequelize.STRING(1000),
        allowNull : false
    },
    dimensions : {
        type : sequelize.STRING
    }
}, {
    timestamps : false,
    freezeTableName : true
});

module.exports = ProductImages