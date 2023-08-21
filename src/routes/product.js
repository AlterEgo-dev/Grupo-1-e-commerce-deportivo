const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const path = require('path');

router.get('/detail/:id', productController.productDetail);
router.get('/product/crear', productController.productEdit);

/*** VISTA PRODUCTOS EN LISTA ***/

router.get('/product/product-admin', productController.productAdminList);

/*** EDITAR PRODUCTO ***/

router.get('/product/product-edit/:id', productController.productEditForm);
router.post('/product/product-edit/:id', productController.saveEditedProduct);

module.exports = router;