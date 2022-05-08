//model represent tables in collection/database

const mongoose = require('mongoose')
    //class or constructor function
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    feature: { type: String, required: true },
})
const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu