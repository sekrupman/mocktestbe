const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  const config = require(__dirname + '/../config/config.json').development;
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize };
