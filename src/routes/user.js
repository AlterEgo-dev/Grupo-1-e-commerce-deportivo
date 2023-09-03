const express = require('express');
const router = express.Router();

// CONTROLADORES

const userController = require('../controllers/userController');

// MIDDLEWARE

const { validacionesRegistro, resultadoValidacion } = require('../middlewares/validarRegistro');
const { validacionesInicioSesion, resultadoInicioSesion } = require('../middlewares/validarLogin');
const { authRedirectSession, authSession } = require('../middlewares/authSession');

// RUTA DEL LOGIN

router.get('/login', authRedirectSession, userController.formLogin);
router.post('/login', validacionesInicioSesion, resultadoInicioSesion, userController.login);

// RUTA DEL REGISTRO

router.get('/register', authRedirectSession, userController.formRegister);
router.post('/register', validacionesRegistro, resultadoValidacion, userController.register);

// SALIDA

router.get('/logout', authSession, userController.logout);

module.exports = router;