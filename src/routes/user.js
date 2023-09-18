const express = require('express');
const router = express.Router();

// CONTROLADORES

const userController = require('../controllers/userController');

// MIDDLEWARE

const { validacionesRegistro, resultadoValidacion } = require('../middlewares/validarRegistro');
const { validacionesInicioSesion, resultadoInicioSesion } = require('../middlewares/validarLogin');
const { authRedirectSession, authSession } = require('../middlewares/authSession');
const { authEditProfile } = require('../middlewares/validacionesPerfil')
const {upload} = require ('../middlewares/validacionesPerfil')

// RUTA DEL LOGIN

router.get('/login', authRedirectSession, userController.formLogin);
router.post('/login', validacionesInicioSesion, resultadoInicioSesion, userController.login);

// RUTA DEL REGISTRO

router.get('/register', authRedirectSession, userController.formRegister);
router.post('/register', validacionesRegistro, resultadoValidacion, userController.register);

// SALIDA

router.get('/logout', authSession, userController.logout);

//RUTAS Y FORMULARIOS DEL PERFIL

router.get('/perfil/:id', authSession, userController.perfil);
router.put('/perfil/:id' , authSession, authEditProfile, upload.single("img"), userController.subirFoto);
router.delete('/perfil/:id', authSession, authEditProfile, userController.eliminarFoto)

module.exports = router;