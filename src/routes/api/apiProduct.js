// ACA DE LO QUE SACAMOS DE LAS APICONTROLLER
const express = require('express')
const apiProductsController = require('../../controllers/api/apiProductsController')
const router = express.Router()

router.get('/products', apiProductsController.list);

module.exports = router;