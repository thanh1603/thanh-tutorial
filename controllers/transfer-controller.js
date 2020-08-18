const shortid = require('shortid');
const db = require('../db');


module.exports.create = (req, res, next) => {
    res.render('transfer/create', {
        csrfToken: req.csrfToken()
    });
};

module.exports.postCreate = (req, res, next) => {
    const data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        bookId: req.signedCookies.bookId
    };
    console.log(data);
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
};