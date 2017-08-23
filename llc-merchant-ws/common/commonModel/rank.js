const sequelize = require('sequelize');
const db = require('./../../db');

const Rank = db.define('display_rank' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    display_value:{
         type: sequelize.INTEGER,
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

module.exports = Rank;
