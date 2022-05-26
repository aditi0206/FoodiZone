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
const passport = require('passport')
const Emitter = require('events')
    //database connection
    // const url = 'mongodb://localhost/food';
mongoose.connect(process.env.MONGO_CONNECTION_URL).then(() => {
    console.log('Database connected');
}).catch((err) => console.log('Connection failed'));

//event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

// passport config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL,
        collection: 'sessions'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours

}))
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//session config

app.use(flash())
    // assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//global middleware-normalfunction
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user //logged in user set
    next() //request is passed for next instruction
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//passing function
require('./routes/web.js')(app)


const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
    //socket
const connection = mongoose.connection
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join

    socket.on('join', (orderId) => {

        socket.join(orderId)
    })
})
eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})