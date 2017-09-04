const sequelize = require('sequelize');
const db = require('./../../../db');
const TemplateController = require('./../templateModels/templateModel');
const TemplateImages = db.define('template_images',{
    img_id :{
        type : sequelize.INTEGER,
        allowNull : false,
        primaryKey:true
    },
    template_id : {
        type : sequelize.INTEGER,
        references : {
            model : TemplateController,
            key : "tem_id"
        },
        allowNull : false
    },
    destination_type : {
        type:   sequelize.ENUM,
        values: ['youtube','facebook','twitter','instagram'],
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
    client_name:{
        type : sequelize.STRING(45),
        allowNull: false
    },
    client_img: {
        type : sequelize.STRING(100),
        defalutvalue : ''
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
    }
}, {
    timestamps : false,
    freezeTableName : true
});
module.exports = TemplateImages;
// TemplateImages.belongsTo(TemplateController); 
// TemplateController.hasMany(TemplateController);