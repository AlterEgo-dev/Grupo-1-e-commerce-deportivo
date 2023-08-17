const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/detail/:id', productController.productDetail);
router.get('/product/crear', productController.productEdit);

module.exports = router;