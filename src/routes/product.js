const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const path = require('path');

router.get('/detail/:id', productController.productDetail);

/*** VISTA PRODUCTOS EN LISTA ***/

router.get('/product/product-admin', productController.productAdminList);

/*** EDITAR PRODUCTO ***/

router.get('/product/product-edit/:id', productController.productEditForm);
router.post('/product/product-edit/:id', productController.saveEditedProduct);

/*** CREAR UN PRODUCTO ***/

router.get('/product/crear', productController.productCreate);
router.post('/product/crear', productController.productCreatePush);


module.exports = router;