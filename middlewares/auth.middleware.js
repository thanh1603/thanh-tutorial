const db = require('../db');

module.exports.requireAuth = (req, res, next) =>{
    // Console.log(req.cookies, req.signedCookies );
    if (!req.signedCookies.bookId) {
        res.redirect('/auth/login');
        return;
    }
    var book = db.get('books').find({
         id: req.signedCookies.bookId }).value();
    //kiem tra id co trong db ko
    if (!book) {
        res.redirect('/auth/login');
        return;
    }//tim user 1 lan nua

    res.locals.book = book;
    
    //bien local chi ton tai -> tai vong doi cua req vs res do

    next();
};