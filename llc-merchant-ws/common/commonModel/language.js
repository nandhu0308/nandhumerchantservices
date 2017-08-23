const sequelize = require('sequelize');
const db = require('./../../db');

const Language = db.define('language_info' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    lang_code:{
         type: sequelize.STRING(3),
        allowNull: false

    },
    lang_name:{
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

module.exports = Language;
