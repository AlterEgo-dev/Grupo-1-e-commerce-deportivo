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
router.get('/product/product-create', productController.productCreate);
router.post('/product/product-create', productController.productCreatePush);
router.delete('/product/product-edit/:id', productController.deleteProduct);

router.delete('/product/product-edit/:id/delete-image/:index', productController.deleteProductImage);


module.exports = router;