const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.home);
router.get('/login-register', mainController.register);
router.get('/carrito', mainController.carrito);
router.get('/product/crear', productController.productEdit);
router.get('/product/product-edit/:id', productController.productEditForm);
router.put('/product/product-edit/:id', productController.saveEditedProduct);

module.exports = router;