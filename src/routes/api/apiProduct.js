// ACA DE LO QUE SACAMOS DE LAS APICONTROLLER
const express = require('express')
const apiProductController = require('../../controllers/api/apiProductController')
const router = express.Router()

router.get("/products", apiProductController.list)