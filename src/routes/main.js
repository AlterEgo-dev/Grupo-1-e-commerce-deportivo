const express = require ('express');
const router = express.Router();
const mainController = require ('../controllers/mainController');
const productController = require('../controllers/productController');

router.get('/', mainController.home);
router.get('/register', mainController.register);
router.get('/crear', productController.productEdit);

module.exports = router;