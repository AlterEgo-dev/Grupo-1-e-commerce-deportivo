const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');

router.get('/:id', productController.productDetail);
router.get('/crear', productController.productEdit);

module.exports = router;