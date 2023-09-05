const { body, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { emitWarning } = require('process');

const pathFile = path.join(__dirname, '..', 'dataBase', 'newUser.json');

const validacionesInicioSesion = [
    body('userEmail').notEmpty().withMessage('El correo electrónico es obligatorio').bail(),
    body('userPassword').notEmpty().withMessage('La contraseña es obligatoria').bail(),
];

const resultadoInicioSesion = (req, res, next) => {
    const errors = validationResult(req);

    // SI HAY CAMPOS VACIOS RETORNA

    if (!errors.isEmpty()) {
        return res.render('login', {
            errors: errors.mapped(),
            old: req.body
        });
    }

    // LEE EL JSON

    const arrData = JSON.parse(fs.readFileSync(pathFile, 'utf-8'));

    const { userEmail, userPassword } = req.body;
    const user = arrData.find(user => user.userEmail === userEmail || user.username === userEmail);


    // COMPARA Y RETORNA INFO INCORRECTA

    if (!user || !compareSync(userPassword, user.userPassword)) {
        return res.render('login', { error: 'Credenciales incorrectas' });
    }

    // DEVUELVE EL ID DEL USUARIO

    req.session.userId = user.id;

    req.user = user;

    next();
};

module.exports = {
    validacionesInicioSesion,
    resultadoInicioSesion
};
