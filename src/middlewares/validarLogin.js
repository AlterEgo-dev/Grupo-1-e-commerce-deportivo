const { body, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { emitWarning } = require('process');
const pathFile = path.join(__dirname, '..', 'dataBase', 'users.json');

const validacionesInicioSesion = [
    body('userEmail').notEmpty().withMessage('EL CORREO ELECTRÓNICO ES OBLIGATORIO').bail(),
    body('userPassword').notEmpty().withMessage('LA CONTRASEÑA ES OBLIGATORIA').bail(),
];

// MIDDLEWARE PARA PROCESAR EL RESULTADO DEL INICIO DE SESION
const resultadoInicioSesion = (req, res, next) => {
    // VALIDA SI HAY ERRORES DE VALIDACIÓN EN LA SOLICITUD
    const errors = validationResult(req);

    // SI HAY CAMPOS VACÍOS, MUESTRA LOS ERRORES
    if (!errors.isEmpty()) {
        return res.render('login', {
            errors: errors.mapped(),
            old: req.body
        });
    }

    // LEE LOS DATOS DE USUARIOS EN UN ARCHIVO JSON
    const arrData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));

    const { userEmail, userPassword } = req.body;

    // BUSCA AL USUARIO EN LOS DATOS POR CORREO ELECTRÓNICO O NOMBRE DE USUARIO
    const user = arrData.find(user => user.userEmail === userEmail || user.username === userEmail);

    // COMPARA LA CONTRASEÑA INGRESADA CON LA CONTRASEÑA ALMACENADA DEL USUARIO USANDO HASH COMPARE SYNC
    if (!user || !compareSync(userPassword, user.userPassword)) {
        return res.render('login', { error: 'CREDENCIALES INCORRECTAS' });
    }

    // ALMACENA EL ID DEL USUARIO EN LA SESION PARA MANTENERLO AUTENTICADO
    req.session.userId = user.id;

    // ALMACENA INFORMACION DEL USUARIO EN LA SOLICITUD
    req.user = user;

    next();
};

module.exports = {
    validacionesInicioSesion,
    resultadoInicioSesion
};

