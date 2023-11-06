const express = require('express')
const apiUserController = require('../../controllers/api/apiUserController')
const router = express.Router()

router.get('/users', apiUserController.users);

module.exports = router;