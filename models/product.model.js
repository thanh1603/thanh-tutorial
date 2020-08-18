const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:String,
    img:String,
    description: String
});

const Product = mongoose.model('Product', bookSchema, 'products');

module.exports = Product;
