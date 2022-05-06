const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')

function initRoutes(app) {

    app.get('/', homeController().index)

    // (req, res) => {
    // res.render('home')
    // }

    app.get('/cart', (req, res) => {
        res.render('customers/cart')
    })
    app.get('/login', authController().login)


    app.get('/register', (req, res) => {
        res.render('auth/register')
    })

}

module.exports = initRoutes
    //exporting function