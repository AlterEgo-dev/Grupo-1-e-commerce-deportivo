const express = require('express')
const apiUserController = require('../../controllers/api/apiUserController')
const router = express.Router()

router.get('/users', apiUserController.users);
router.get('/users/:id', apiUserController.getUsers)

module.exports = router;