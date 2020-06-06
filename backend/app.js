var express = require('express')
var cors = require('cors')
var usersRouter = require('./routes/users')
var app = express()
var port = process.env.PORT || 3306

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', usersRouter)

app.listen(port, function() { console.log(`listening on port ${port}`)})