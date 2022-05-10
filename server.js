require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')

//database connection
const url = 'mongodb://localhost/food';
mongoose.connect(process.env.MONGO_CONNECTION_URL).then(() => {
    console.log('Database connected');
}).catch((err) => console.log('Connection failed'));
const connection = mongoose.connection;

///session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL,
        collection: 'sessions'
    }),
    saveUninitialized: false,
    // cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours

}))

app.use(flash())

// assets
app.use(express.static('public'))
app.use(express.json())

//global middleware-normalfunction
app.use((req, res, next) => {
    res.locals.session = req.session
    next() //request is passed for next instruction
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//passing function
require('./routes/web.js')(app)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})