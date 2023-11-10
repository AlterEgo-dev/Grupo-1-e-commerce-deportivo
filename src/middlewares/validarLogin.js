const { body, validationResult } = require('express-validator');
const { compareSync } = require('bcryptjs');
const db = require('../dataBase/models');
const sequelize = require('sequelize');

const validacionesInicioSesion = [

    //VERIFICACIÓN EMAIL
    body('userEmail')
    .notEmpty().withMessage('Debe ingresar un correo electrónico').bail()
    .isEmail().withMessage('El correo electrónico debe ser válido').bail()
    .custom(async (value) => {
        // Verificar si el correo electrónico existe en la base de datos
        const user = await db.User.findOne({ where: { Email: value } });
        if (!user) {
          throw new Error('Correo electrónico no registrado');
        }
        return true;
      }),
      //VERIFICACIÓN PASSWORD
      body('userPassword')
      .notEmpty().withMessage('Debe ingresar una contraseña').bail()
];

const resultadoInicioSesion = async (req, res, next) => {
    // VALIDAMOS LOS DATOS DEL FORMULARIO
    const errors = validationResult(req);

    // SI HAY ERRORES DE VALIDACION
    if (!errors.isEmpty()) {
        return res.render('login', {
            errors: errors.mapped(),
            old: req.body
        });
    }
    // OBTENEMOS LOS DATOS DE CORREO Y CONTRASEÑA DEL FORMULARIO
    const { userEmail, userPassword } = req.body;

    try {
        // BUSCAMOS AL USUARIO EN LA BASE DE DATOS POR CORREO
        const user = await db.User.findOne({
            where: {
                [sequelize.Op.or]: [{ Email: userEmail }]
            }
        });
        // SI EL USUARIO NO EXISTE O LA CONTRASEÑA NO COINCIDE
        if (!user || !compareSync(userPassword, user.Password)) { 
            return res.render('login', { error: 'Correo o contraseña incorrecta' });
        }
        // SI EL USUARIO EXISTE Y LA CONTRASEÑA COINCIDE NEXT
        req.session.userId = user.id;
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    validacionesInicioSesion,
    resultadoInicioSesion
};