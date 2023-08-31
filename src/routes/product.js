const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const path = require('path');

router.get('/detail/:id', productController.productDetail);

/*** VISTA PRODUCTOS EN LISTA ***/

router.get('/product-admin', productController.productAdminList);
router.get("/category/:category", productController.category)
router.get("/category/genero/:genero", productController.genero)

/*** EDITAR PRODUCTO ***/

router.get('/product-edit/:id', productController.productEditForm);
router.put('/product-edit/:id', productController.saveEditedProduct);

/*** CREAR UN PRODUCTO ***/

router.get('/product-create', productController.productCreate);
router.post('/product-create', productController.productCreatePush);

/*** ELIMINAR PRODUCTO ***/
router.delete('/product-edit/:id', productController.deleteProduct);

router.delete('/product-edit/:id/delete-image/:index', productController.deleteProductImage);


module.exports = router;