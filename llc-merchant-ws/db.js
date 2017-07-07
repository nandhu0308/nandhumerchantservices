const Sequelize = require('sequelize');
const connection = new Sequelize('llcwebdb', 'root', 'pmt11cd3', {
    host: '139.59.15.249',
    dialect: 'mysql'
});

module.exports = connection;