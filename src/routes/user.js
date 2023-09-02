const express = require('express');
const router = express.Router();

// CONTROLADORES

const userController = require('../controllers/userController');

// MIDDLEWARE

const { validacionesRegistro, resultadoValidacion } = require('../middlewares/validarRegistro');
const { validacionesInicioSesion, resultadoInicioSesion } = require('../middlewares/validarLogin');

// RUTA DEL LOGIN

router.get('/login', userController.formLogin);
router.post('/login', validacionesInicioSesion, resultadoInicioSesion, userController.login);

// RUTA DEL REGISTRO

router.get('/register', userController.formRegister);
router.post('/register', validacionesRegistro, resultadoValidacion, userController.register);

//RUTA AL PERFIL
router.get('/perfil/:id', userController.perfil)

module.exports = router;