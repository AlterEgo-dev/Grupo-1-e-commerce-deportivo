const { body, validationResult } = require('express-validator');
const arrData = require('../dataBase/newUser.json');
const path = require('path');
const fs = require('fs');
const { hashSync } = require('bcryptjs');

// JSON

const pathFile = path.join(__dirname, '..', 'dataBase', 'newUser.json')

const validacionesRegistro = [
    body('userRegister').notEmpty().withMessage('Ingresa un nombre').bail().isLength({min:5, max: 30}).withMessage('Al menos 5 caracteres'),
    body('emailRegister').notEmpty().withMessage('Ingresa un email').bail().isEmail().withMessage('Debe ingresar un email valido'),
    body('passwordRegister').notEmpty().withMessage('Ingresa una contraseña').bail().withMessage('Una contraseña mas fuerte, capo')
]

const resultadoValidacion = (req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty() === true){

        const newUser = {
            id: `${arrData.length + 1}`,
            ...req.body,
            passwordRegister: hashSync(req.body.passwordRegister, 10)
        };

        arrData.push(newUser);
        fs.writeFileSync(pathFile, JSON.stringify(arrData))

        console.log(req.body)

        next()

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