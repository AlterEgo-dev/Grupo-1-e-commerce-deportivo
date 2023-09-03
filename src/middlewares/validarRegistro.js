const { body, validationResult } = require('express-validator');
const arrData = require('../dataBase/newUser.json');
const path = require('path');
const fs = require('fs');
const { hashSync } = require('bcryptjs');
const { emitWarning } = require('process');

// JSON
const pathFile = path.join(__dirname, '..', 'dataBase', 'newUser.json')

const validacionesRegistro = [
    body('username').notEmpty().withMessage('El nombre es obligatorio').bail(),
    body('userEmail').bail()
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('Debe ingresar un correo electrónico válido')
        .custom(value => {
            
            // PARA QUE NO SE REPITA EL EMAIL UNA VALIDACION CUSTOM

            return !arrData.some(user => user.userEmail === value);
        }).withMessage('El correo electrónico ya está registrado').bail(),
    body('userPassword').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
        .bail(),
];

const resultadoValidacion = (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors.array());
    // REVISAMOS QUE LOS CAMPOS NO ESTÉN VACÍOS

    if (errors.isEmpty()) {
        const newUser = {
            id: `${arrData.length + 1}`,
            ...req.body,
            userPassword: hashSync(req.body.userPassword, 10)
        };

        // HACE EL PUSH SI NO LO ESTÁN

        arrData.push(newUser);
        fs.writeFileSync(pathFile, JSON.stringify(arrData))

        next()

        // SI HAY CAMPOS VACÍOS RETORNAMOS Y VALIDAMOS 

    } else {
        res.render('register', {
            errors: errors.mapped(),
            old: req.body
        })
    }
}

module.exports = {
    validacionesRegistro,
    resultadoValidacion
}
