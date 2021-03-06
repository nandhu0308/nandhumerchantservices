const sequelize = require('sequelize');
const db = require('./../../../db');
const TemplateController = require('./../templateModels/templateModel');
const TemplateImages = db.define('template_images',{
    
    id :{
        type : sequelize.INTEGER,
        allowNull : false,
        primaryKey:true
    },
    template_id : {
        type : sequelize.INTEGER,
        references : {
            model : TemplateController,
            key : "id"
        },
        allowNull : false
    },
    destination_type : {
        type:   sequelize.ENUM,
        values: ['youtube','facebook','twitter','instagram','haappyapp'],
        allowNull : false
    },
    start_img : {
        type : sequelize.STRING(100),
        defalutvalue : ''
    },
    stop_img : {
        type : sequelize.STRING(100),
        defalutvalue : ''
    },
    created_by : {
        type : sequelize.STRING(255),
        defaultValue : ''
    },
    created_on : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    updated_by : {
        type : sequelize.STRING(255),
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
}, {
    timestamps : false,
    freezeTableName : true
});
module.exports = TemplateImages;
