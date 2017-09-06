const sequelize = require('sequelize');
const db = require('./../../../db');
const TemplateController = require('./../templateModels/templateModel');

const BccSetting = db.define('ha_bcc_setting',{
    template_id : {
        type :sequelize.INTEGER,
        references : {
            model : TemplateController,
            key : "id"
        },
        allowNull : false
    },
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
    },
    bcc_setting:{
        type:sequelize.STRING(200),
        allowNull:false

    },
    cc_setting:{
        type:sequelize.STRING(200),
        allowNull:false

    },
    is_active:{
        type:sequelize.BOOLEAN,
        allowNull:true
    },
    created_by : {
        type :sequelize.STRING(255),
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
    }
    
},{
    timestamps:false,
    freezeTableName:true

})
module.exports=BccSetting;