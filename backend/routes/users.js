const express = require('express')
const router = express.Router()
const User  = require('../models/User')
const passport = require('passport')

router.post('/login',
    passport.authenticate('local', { successFlash: 'login successful', failureFlash: 'login unsuccessful',
    'failureRedirect': '/login' }),
    (req, res) => {
        res.redirect('/home')
    }
)

router.post('/signup', (req, res) => {
    const user = User.build({
        email: req.body.email
    })
    console.log("email: ", req.body.email, "password: ", req.body.password)
    user.password = user.hashPassword(req.body.password)

    if(user.validateEmail(user.email) && user.validatePassword(req.body.password)) {
        user.save()
        req.flash('registration successful')
        res.redirect('/login')
    }
    else {
        res.redirect('/signup')
    }
})

module.exports = router