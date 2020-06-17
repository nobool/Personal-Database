var passport = require('passport')
var LocalStrategy = require('passport-local')
var User = require('../models/User')


passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
    .then((user) => {
        done(null, user)
    })
    .catch((err) => {
        console.log('error:', err)
    })
})

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        console.log('looking for user:', email, password)
        User.findOne({ where: { email: email } })
        .then((user) => {
            if(!user) {
                return done(null, false, { message: 'incorrect email' })
            }
            if(!user.correctPassword(password)) {
                return done(null, false, { message: 'incorrect password' })
            }
            return done(null, user)
        })
        .catch(done)
    }
))
