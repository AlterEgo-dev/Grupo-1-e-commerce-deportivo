const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.home);
router.get('/carrito', mainController.carrito);
router.get('/carrito/:id', mainController.carrito);

module.exports = router;