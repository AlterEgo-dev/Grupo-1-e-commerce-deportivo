const express = require ('express');
const router = express.Router();

const { productController, upload} = require('../controllers/productController')

const path = require('path');
const { authSession, adminSession } = require('../middlewares/authSession');
const {productCreate, validarFormProduct} = require('../middlewares/ProductCreate')
const imagesProducts = require('../middlewares/imagesProducts')


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
router.post('/product-edit/:id',authSession,validarFormProduct, productCreate, productController.productCreatePush); 
//router.post('/product-edit/:id', authSession, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'imageDetail', maxCount: 3 }]),imagesProducts,productController.saveEditedProduct); // RECIBE POR UPLOAD LOS CAMPOS REQUERIDOS, EN ESTE CASO IMAGE(LA IMAGEN PRINCIPAL) E IMAGEDETAL

/*** CREAR UN PRODUCTO ***/

router.get('/product-create', adminSession,  productController.productCreate);
router.post('/product-create', authSession, productCreate, validarFormProduct, upload.fields([{name: 'image1', maxCount: 1}, { name: 'imageDetail', maxCount: 3}]),imagesProducts, productController.productCreatePush);

/*** ELIMINAR PRODUCTO ***/
router.delete('/product-edit/:id', authSession, productController.deleteProduct);
router.delete('/product-edit/:id/delete-image/:index', authSession, productController.deleteProductImage);


module.exports = router;