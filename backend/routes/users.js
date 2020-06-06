const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const Users  = require('../models/Users')
const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = "secret"

// handle signup
/*
router.post('/signup', (req, res) => {
    Users.findAll().then((users) => {
        console.log(users)
    })
    res.redirect('http://localhost:3000/login')
})
*/

router.post('/signup', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    console.log("email: ", userData.email, "password: ", userData.password)
    const hash = bcrypt.hashSync(userData.password, 10)
    userData.password = hash

    Users.create(userData)
    .then(() => {
        console.log('user registration successful')
        res.redirect('http://localhost:3000/login')
    })
    .catch(err => {
        console.log('error: ', err)
    })
})

router.post('/login', (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        console.log('found user: ', user.get('email'))
        res.redirect('http://localhost:3000/home')
    })
})

/*
router.post('/login', (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    })

    .then(user => {
        // does user exist?
        if(!user) {
            console.log("account does not exist")
            res.status(400).send("account does not exist")
        }
        else {
            // is password correct?
            if(bcrypt.compareSync(req.body.password, user.password)) {

                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
                // take user to their account page

                res.redirect('http://localhost:3000/home')
            }
            else {
                console.log("incorrect password")
                res.status(400).send("password incorrect")
            }
        }
    })
    .catch(err => {
        res.status(err.status || 400).send("error: ", err)
    })
})
*/

/*
router.post('/signup', (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    // look for existing user
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        // create new user if there are no users
        if(!user) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash
            Users.create(userData)
            .then(() => {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
                res.redirect('http://localhost:3000/login')
            })
            .catch(err => {
                res.status(400).send("error: ", err)
            })
        }
        // if the user exists:
        else {
            //res.send("account already exists!")
            res.redirect('http://localhost:3000/')
        }
    }).catch(err => {
        res.status(err.status || 400).send("error: ", err)
    })
})
*/

// handle login
/*
router.post('/login', (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    })

    .then(user => {
        // does user exist?
        if(!user) {
            res.send("account does not exist")
        }
        else {
            // is password correct?
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
                // take user to their account page
                res.redirect('/home')
            }
            else {
                res.send("password incorrect")
            }
        }
    })
    .catch(err => {
        res.send("error: ", err)
    })
})
*/

module.exports = router