//factory functions-object creation function- programming function
const Menu = require('../../models/menu')

function homeController() {
    return {
        async index(req, res) {
            const foodi = await Menu.find()
            console.log(foodi)
            return res.render('home', { foodi: foodi })
        }
    }
}
module.exports = homeController