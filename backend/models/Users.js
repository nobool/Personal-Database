const Sequelize = require('sequelize')
const db = require('../database/db')

// create a new table
var Users = db.sequelize.define('Users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)

module.exports = Users

// force: true will drop the table if it already exists
Users.sync({force: false}).then(function () {
    console.log("Users table database created")
    /*
    return Users.create({
      email: 'John',
      password: 'Hancock'
    })
    */
})