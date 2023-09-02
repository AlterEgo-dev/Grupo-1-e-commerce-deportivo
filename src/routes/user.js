const express = require('express');
const router = express.Router();

// CONTROLADORES

const userController = require('../controllers/userController');

// MIDDLEWARE

const { validacionesRegistro, resultadoValidacion } = require('../middlewares/validarRegistro');

router.get('/login', userController.formLogin);
router.post('/login', userController.login);



router.get('/register', userController.formRegister);
router.post('/register', validacionesRegistro, resultadoValidacion, userController.register);

module.exports = router;