const sequelize = require('sequelize');
const db = require('./../../../db');

const TemplateController = db.define('notification_template', {
    id :{
        type:sequelize.INTEGER,
        primaryKey :true,
        allowNull:false
    },
    template_name:{
        type:sequelize.STRING(50),
        allowNull:false
    },
    description:{
        type:sequelize.STRING(1000),
        allowNull:true
    },
    template_content:{
        type:sequelize.TEXT,
        allowNull:true
    },
    created_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    created_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    updated_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    is_active:{
        type:sequelize.BOOLEAN,
        allowNull:true
    }
},{
    timestamps:false,
    freezeTableName:true
})
module.exports=TemplateController;
