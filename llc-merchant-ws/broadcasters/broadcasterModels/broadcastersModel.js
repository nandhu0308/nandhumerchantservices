const sequelize = require('sequelize');
const db = require('./../../db');

const Broadcasters = db.define('broadcasters',  {
   
   id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        allowNull: false
   },
   
    seller_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    rank: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    broadcaster_name : {
        type : sequelize.STRING,
        allowNull : false
    },
    broadcaster_channel_name : {
        type : sequelize.TEXT
    },
    category_id : {
            type : sequelize.INTEGER,
            allowNull : false
    },
    broadcaster_email : {
        type : sequelize.STRING(500),
        allowNull : false,
        defaultValue : ''
    },
    broadcaster_description : {
        type : sequelize.TEXT,
        allowNull: false
    },

    broadcaster_website : {
        type : sequelize.STRING(500),
        allowNull: false
    },

    broadcaster_image : {
        type : sequelize.STRING(500),
        allowNull: false
    },

    broadcaster_tags : {
        type : sequelize.STRING(500),
        allowNull: false
    },

     broadcaster_total_videos: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    is_active : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    created_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    broadcaster_created_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },

    updated_by : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    
    broadcaster_updated_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },
    server_pu_dns_name:{
        type:sequelize.STRING,
        defaultValue:''
    },
    server_pr_dns_name:{
        type:sequelize.STRING,
        defaultValue:''
    },
    mapped_domain_name:{
        type:sequelize.STRING,
        defaultValue:''
    },

    w_application_name:{
        type:sequelize.STRING(100),
        defaultValue:''
    },

}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = Broadcasters;