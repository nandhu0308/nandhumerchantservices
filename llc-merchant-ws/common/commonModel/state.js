const sequelize = require('sequelize');
const db = require('./../../db');

const State = db.define('state-info' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    country_id:{
        type: sequelize.INTEGER,
        allowNull: false
   },
    state_code:{
         type: sequelize.STRING(3),
        allowNull: false

    },
    state_name:{
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

module.exports = State;
