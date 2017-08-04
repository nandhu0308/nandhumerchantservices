const sequelize = require('sequelize');
const db = require('./../../db');

const Country = db.define('country-info' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    country_code:{
         type: sequelize.STRING(3),
        allowNull: false

    },
    country_name:{
        type:sequelize.STRING(50),
         allowNull: false
    },
    is_active:{
         type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    }
},{
    timestamps : false,
    freezeTableName : true
})

module.exports = Country;
