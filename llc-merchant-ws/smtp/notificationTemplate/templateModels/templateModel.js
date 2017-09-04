const sequelize = require('sequelize');
const db = require('./../../../db');
const TemplateImages = require('./../templateModels/templateImagesModel');
const TemplateController = db.define('notification_template', {
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
    is_active:{
        type:sequelize.BOOLEAN,
        allowNull:true
    }                       
},{
    timestamps:false,
    freezeTableName:true
})
module.exports=TemplateController;
// TemplateController.sync();