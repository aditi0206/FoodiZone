//factory functions-object creation function- programming function

function homeController() {
    return {
        index(req, res) {
            res.render('home')
        }
    }
}
module.exports = homeController