const db =  require('../db');

module.exports.index = (req, res) => {
    const sessionId = req.signedCookies.sessionId;
    

    if(!sessionId) {
        res.redirect('/products');
        return;
    }
    // const count = db
    //     .get('sessions')
    //     .find({id : sessionId})
    //     .get('cart.' + productId, 0)
    //     .value();// truyn vao tham so mac dinh  la 0
    const cart = db
        .get('sessions')
        .find({id : sessionId})
        .value().cart;

    const page = parseInt(req.query.page) ||1 ;//n  lay gtri page neu ko co mac dinh la 1
    const perPage = 8;//x

    const start = (page - 1) * perPage;//start = (n-1) * x
    const end = page * perPage;// end =  (n-1) * x + x = n *x
    const drop = (page - 1)*perPage;
    console.log(cart);
    
    res.render('products/index', {
         products: db.get('products').value().slice(start, end,page ), //--cach1
         currentPage: page,
         count: Object.keys(cart).length
    });
};
module.exports.cart = (req, res) => {
    const sessionId = req.signedCookies.sessionId;

    const page = parseInt(req.query.page) ||1 ;//n  lay gtri page neu ko co mac dinh la 1
    const perPage = 8;//x

    const start = (page - 1) * perPage;//start = (n-1) * x
    const end = page * perPage;// end =  (n-1) * x + x = n *x
    const drop = (page - 1)*perPage;
    
    res.render('products/view', {
         products: db.get('products').value().slice(start, end,page ),
         currentPage: page
    });
};
