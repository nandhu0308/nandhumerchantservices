const sequelize = require('sequelize');
const db = require('./../../db');

const Broadcasters = db.define('broadcasters', {
    broadcasters_id: {
        type: sequelize.INTEGER,
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
    createdby : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    broadcaster_created_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    },

    updatedby : {
        type : sequelize.STRING,
        defaultValue : ''
    },
    
    broadcaster_updated_time : {
        type : sequelize.DATE,
        defaultValue : sequelize.NOW
    }
}, {
    timestamps : false,
    freezeTableName : true
})

module.exports = Broadcasters;