const db =  require('../db');
const shortid = require('shortid');


module.exports.index = (req,res) => {
    res.render('books/index', {
        books: db.get('books').value()
    });
};

module.exports.search = (req,res)=> {
    const q = req.query.q;
    const matchedBooks = db.get('books').value().filter(book => {
        return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('books/index',{
        books: matchedBooks
    });
};

module.exports.create = (req,res)=> {
    console.log(req.cookies);
    res.render('books/create');
};
module.exports.update = (req,res)=> {
    res.render('books/update');
};

module.exports.get = (req,res)=> {
    const id = req.params.id;

    var book = db.get('books').find({ id: id }).value();

    res.render('books/view', {
        book : book
    });
};

module.exports.get = (req,res)=> {
    const id = req.params.id;

    var book = db.get('books').find({id:id}).value();

    res.render('books/update', {
        book : book
    });
};
module.exports.deleteBook =(req, res) => {
    db.get('books')
    .remove({ id: req.params.id })
    .write()
    res.redirect('/books');
};

module.exports.postCreate = (req,res)=> {
    req.body.id = shortid.generate();
    // console.log(res.locals);// co the chuyen sang middleware 2
    req.body.avatar = req.file.path.split('\\').slice(1).join('/'); 
    db.get('books').push(req.body).write();
    res.redirect('/books');
};


module.exports.postUpdate = (req,res)=> {
    // console.log('body ', req.body);
    db.get('books')
    .find({ id : req.body.id})
    .assign({name : req.body.name, phone : req.body.phone})
    .write();
    res.redirect('/books');
};

