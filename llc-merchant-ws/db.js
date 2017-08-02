const Sequelize = require('sequelize');
const connection = new Sequelize('llcwebdb', 'root', 'pmt11cd3', {
    host: '139.59.15.249',
    dialect: 'mysql',
    isolationLevel:Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
});

module.exports = connection;