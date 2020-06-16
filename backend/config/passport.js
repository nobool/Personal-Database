var passport = require('passport')
var LocalStrategy = require('passport-local')
var User = require('../models/User')

passport.serializeUser((user, done) => {
    console.log('serializing user', user.id)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    }).catch(done)
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
            if(!user.validPassword(password)) {
                return done(null, false, { message: 'incorrect password' })
            }
            return done(null, user)
        })
        .catch(done)
    }
))
