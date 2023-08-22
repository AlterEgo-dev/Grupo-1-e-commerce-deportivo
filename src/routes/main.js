const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.home);
router.get('/login-register', mainController.register);
router.get('/carrito', mainController.carrito);

router.get('/product/product-edit/:id', productController.productEditForm);
router.put('/product/product-edit/:id', productController.saveEditedProduct);
router.get('/product/product-admin', productController.productAdminList);
router.get('/product/crear', productController.productCreate);
router.post('/product/crear', productController.productCreatePush);

module.exports = router;