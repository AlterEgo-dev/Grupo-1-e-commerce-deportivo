// ACA DE LO QUE SACAMOS DE LAS APICONTROLLER
const express = require('express')
const apiProductsController = require('../../controllers/api/apiProductsController')
const router = express.Router()

router.get('/products', apiProductsController.list);
router.get('/products/last', apiProductsController.LastProduct);
router.get('/products/:id', apiProductsController.productId);

module.exports = router;