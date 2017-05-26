const Sequelize = require('sequelize');
const connection = new Sequelize('llcwebdb', 'root', 'limitless', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;