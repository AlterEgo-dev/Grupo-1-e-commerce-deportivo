const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.home);
router.get('/login-register', mainController.register);
router.get('/carrito', mainController.carrito);



module.exports = router;