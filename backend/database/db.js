const Sequelize = require('sequelize');
const db = {}

/*
const sequelize = new Sequelize('personal_database', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    socketPath: '/var/run/mysqld/mysqld.sock',
    dialectOptions: {
        connectTimeout: 60000
    }
})
*/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db