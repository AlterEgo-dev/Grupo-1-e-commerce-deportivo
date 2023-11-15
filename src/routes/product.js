const express = require ('express');
const router = express.Router();

const { productController, upload} = require('../controllers/productController')

const path = require('path');
const { authSession, adminSession } = require('../middlewares/authSession');
const editCreate = require('../middlewares/editCreate');


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
router.post('/product-edit/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'imageDetail', maxCount: 3 }]), authSession, editCreate, productController.saveEditedProduct);

/*** CREAR UN PRODUCTO ***/

router.get('/product-create', adminSession,  productController.productCreate);
router.post('/product-create', upload.fields([{name: 'image1', maxCount: 1}, { name: 'imageDetail', maxCount: 3}]), authSession, editCreate, productController.productCreatePush);

/*** ELIMINAR PRODUCTO ***/
router.delete('/product-edit/:id', authSession, productController.deleteProduct);

// comentado hasta que hagamos la logica para esto

// router.delete('/product-edit/:id/delete-image/:index', authSession, productController.deleteProductImage);


module.exports = router;