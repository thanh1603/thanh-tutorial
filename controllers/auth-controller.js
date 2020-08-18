const md5 = require('md5');

const db =  require('../db');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    const email = req.body.email; //kiem tra trong db co thang email nao ko giong vow req truyen vao ko
    const password = req.body.password;

    const book = db.get('books').find({email: email}).value();
    // lay user trong db ra ---  - email : email-- trung nhau .value() de tra ve 1 object co email thi co .. ko co email thi se ko co object (undefind - null)
    if(!book) {
        res.render('auth/login', {
            errors : [
                'Book does not exits.'
            ],
            values: req.body
        });
        return;
    }

    const hashedPassword = md5(password);

    if (book.password !== hashedPassword) {
        res.render('auth/login', {
            errors : [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('bookId', book.id, {
        signed: true
    });
    //tu day mat khau hop le
    res.redirect('/books');
};