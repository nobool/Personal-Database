const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User  = require('../models/User')
const passport = require('passport')

router.post('/login',
    passport.authenticate('local', { successFlash: true, failureFlash: true }),
    (req, res) => {
        res.redirect('/home')
    }
)

router.post('/signup', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    console.log("email: ", userData.email, "password: ", userData.password)
    const hash = bcrypt.hashSync(userData.password, 10)
    userData.password = hash

    User.create(userData)
    .then(() => {
        console.log('user registration successful')
        res.redirect('/login')
    })
    .catch(err => {
        console.log('error: ', err)
    })
})

module.exports = router