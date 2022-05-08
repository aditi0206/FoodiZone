//factory functions-object creation function- programming function

function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        }


    }
}
module.exports = cartController