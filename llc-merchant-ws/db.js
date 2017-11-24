const Sequelize = require('sequelize');
const timezone = 'UTC'
process.env.TZ = timezone
const connection = new Sequelize('llcdbstagging', 'root', 'pmt11cd3', {
    host: '139.59.15.249',
    dialect: 'mysql',
    options: {
        dialectOptions: {
          timezone
        }
        , timezone
      },
    pool: {
        max: 5,
        min: 0,        
        idle: 10000
      },
    //isolationLevel:Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    
});

module.exports = connection;