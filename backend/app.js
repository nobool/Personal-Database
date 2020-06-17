var express = require('express')
var session = require('express-session')
var passport = require('passport')
var usersRouter = require('./routes/users')
require('./config/passport')
var app = express()
var port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"))
app.use(session({ secret: "cats" }))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('flash')())

app.use('/', usersRouter)

app.listen(port, function() { console.log(`listening on port ${port}`)})