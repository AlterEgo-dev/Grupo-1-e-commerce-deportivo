const express = require ('express');
const router = express.Router();
const productController = require ('../controllers/productController');
const path = require('path');
const { authSession, adminSession } = require('../middlewares/authSession');

router.get('/detail/:id', productController.productDetail);

/*** VISTA PRODUCTOS EN LISTA ***/

/*Buscador del navbar*/
router.get('/search', productController.search);

router.get('/product-admin',adminSession, productController.productAdminList); 
/* pueden editar el "autenticationMiddleware" por el de ustedes, por ejemplo Alexis tendrias que hacer tu middleware para ocultar la vista a los usuarios */

router.get("/category/:category", productController.category)
router.get("/category/genero/:genero", productController.genero)

/*** EDITAR PRODUCTO ***/

router.get('/product-edit/:id', adminSession, productController.productEditForm);
router.put('/product-edit/:id', authSession, productController.saveEditedProduct);

/*** CREAR UN PRODUCTO ***/

router.get('/product-create', adminSession, productController.productCreate);
router.post('/product-create', authSession, productController.productCreatePush);

/*** ELIMINAR PRODUCTO ***/
router.delete('/product-edit/:id', authSession, productController.deleteProduct);

router.delete('/product-edit/:id/delete-image/:index', authSession, productController.deleteProductImage);


module.exports = router;