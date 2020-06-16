const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../database/db')

// create a new table
var User = db.sequelize.define('User',
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

User.prototype.validPassword = (password) => {
    return bcrypt.compare(password, this.password);
}

module.exports = User

// force: true will drop the table if it already exists
User.sync({force: false}).then(function () {
    console.log("Users table database created")
    /*
    return Users.create({
      email: 'John',
      password: 'Hancock'
    })
    */
})