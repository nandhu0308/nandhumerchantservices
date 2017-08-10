const sequelize = require('sequelize');
const db = require('./../../db');

const City = db.define('city-info' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    state_id:{
        type: sequelize.INTEGER,
        allowNull: false
   },
    city_code:{
         type: sequelize.STRING(3),
        allowNull: false

    },
    city_name:{
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

module.exports = City;
