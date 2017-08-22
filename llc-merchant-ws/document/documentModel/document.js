const sequelize = require('sequelize');
const db = require('./../../db');

const Doument = db.define('document_type' , {
     id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
    document_name:{
         type: sequelize.STRING(50),
        allowNull: false

    },
    description:{
        type:sequelize.STRING(100),
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

module.exports = Doument;
