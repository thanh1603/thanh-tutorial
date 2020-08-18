require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const bookRoute = require('./routers/book-router');
const authRoute = require('./routers/auth-router');
const productsRoute = require('./routers/product.route');
const cartRouter = require('./routers/cart-router');
const transferRoute = require('./routers/transfer-router');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

var port =3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index', {
        name: 'You',
    });
});

app.use('/books', authMiddleware.requireAuth, bookRoute);

app.use('/auth', authRoute);
app.use(csurf({ cookie: true}));

app.use('/products', productsRoute);
app.use('/cart', cartRouter);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () =>{
    console.log('server listening on port '+ port);
});