const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../database/db')

// create a new table
const User = db.sequelize.define('User',
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

User.prototype.validateEmail = function(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}
User.prototype.validatePassword = function(password) {
    return password.length > 5
}
User.prototype.correctPassword = function(password) {
    //console.log('PASSWORD:', password, 'HASH:', this.password)
    return bcrypt.compareSync(password, this.password)
}
User.prototype.hashPassword = function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10)
}

// force: true will drop the table if it already exists
User.sync({ force: true }).then(function () {
    console.log('Users table database created')
})

module.exports = User