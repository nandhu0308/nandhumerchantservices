const sequelize = require('sequelize');
const db = require('./../../db');

const Broadcasters = db.define('broadcasters',  {
      
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

    category_id: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },

    seller_id: {
        type: sequelize.INTEGER,
        defaultValue: 0
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

    broadcaster_loc_latitude:{
        type:sequelize.FLOAT(3,6),
        allowNull:false,
        defaultValue:0.000000
    },

    broadcaster_loc_longitude:{
        type:sequelize.FLOAT(3,6),
        allowNull:false,
        defaultValue:0.000000
    },

     broadcaster_total_videos: {
        type: sequelize.INTEGER,
        allowNull: false
    },

    broadcaster_kyc_doc_type:{
        type:sequelize.STRING,
        allowNull:true
    },
 broadcaster_kyc_doc_value:{
        type:sequelize.STRING,
        allowNull:true
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
    primary_channel_id: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    country_code:{
        type:sequelize.STRING(3),
        defaultValue:'IND'
    },
    state_code:{
        type:sequelize.STRING(3),
        defaultValue:'KA'
    },
    city_code:{
        type:sequelize.STRING(3),
        defaultValue:'BLR'
    },
    w_j_appl_name:{
        type:sequelize.STRING(45),
        defaultValue:''
    },
    is_loop_until : {
        type : sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },

}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = Broadcasters;