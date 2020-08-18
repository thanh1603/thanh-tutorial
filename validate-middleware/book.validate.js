module.exports.postCreate = (req, res, next)=> {
    const errors = [];

    if (!req.body.name) {
        errors.push('Name is reaquired.');
    }
    if (!req.body.phone) {
        errors.push('Phone is reaquired.');
    }
    if (errors.length) {
        res.render('books/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    res.locals.success = true; //lưu các biết để chuyển cho các middleware khác nhau ở biết locals

    next();
//validation
};