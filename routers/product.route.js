const express = require('express');

const controller = require('../controllers/product-controller');

const router = express.Router();

router.get('/', controller.index);

// router.get('/view',(req,res)=>{
//     res.send("hihi")
// })
router.get('/view', controller.cart);

module.exports = router;