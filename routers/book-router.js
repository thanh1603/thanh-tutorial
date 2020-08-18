const express = require('express');
const multer = require('multer');

const controller = require('../controllers/book-controller');
const validate = require('../validate-middleware/book.validate');
// const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({dest: './public/uploads/'});


const router = express.Router();

router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
    res.cookie('book-id', 12345);
    res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/update', controller.update);

// router.get('/books', controller.remove);

router.get('/:id', controller.get);

router.post('/create', 
    upload.single('avatar') ,
    validate.postCreate, 
    controller.postCreate
);

router.post('/update', controller.postUpdate);

router.get('/book/:id', controller.deleteBook);

module.exports = router;
