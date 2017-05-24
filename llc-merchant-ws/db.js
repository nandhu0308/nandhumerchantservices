const Sequelize = require('sequelize');
const connection = new Sequelize('llcwebdb', 'root', 'ramk', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;