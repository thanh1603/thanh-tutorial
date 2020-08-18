const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
    avatar:String,
    phone:String
});// khai bao nhung cais filer chung ta co vao day-- > doc tai lieu

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = book;



