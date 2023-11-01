const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../dataBase/models');
const sequelize = require('sequelize');

const validacionesRegistro = [
    body('username').notEmpty().withMessage('El nombre es obligatorio').bail(),
    body('userEmail').notEmpty().withMessage('El correo electrónico es obligatorio')
        // .isEmail().withMessage('EL CORREO ELECTRONICO DEBE CONTENER hotmail, outlook, gmail, etc').bail()
        .custom(async (value) => {

            // COMPROBAMOS SI EL CORREO YA ESTA REGISTRADO
            const existingUser = await db.User.findOne({
                where: {
                    [sequelize.Op.or]: [{ Email: value }, { UserName: value }]
                }
            });
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado');
            }
            const domains = ["yahoo.com", "hotmail.com", "outlook.com", "gmail.com"];
            const emailDomain = value.split('@')[1];

            if (!domains.includes(emailDomain)) {
                throw new Error('El dominio del correo electrónico no está permitido');
            }
            return true;
        }),
    body('userPassword').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
        .bail(),
];

const resultadoRegistro = async (req, res, next) => {
    const errors = validationResult(req);

    // SI HAY ERRORES DE VALIDACION
    if (!errors.isEmpty()) {
        return res.render('register', {
            errors: errors.mapped(),
            old: req.body
        });
    }

    const { username, userEmail, userPassword } = req.body;

    try {
        // HASHEAMOS LA CONTRASEÑA ANTES DE ALMACENARLA EN LA BASE DE DATOS
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // SE CREA UN NUEVO USUARIO EN LA BASE DE DATOS
        const miAvatar = '../../img/img-perfil/sin-perfil.png';
        db.User.create({
            UserName: username,
            Email: userEmail,
            Password: hashedPassword,
            Avatar: miAvatar,
            Role: 'Admin',
            CreatedAt: new Date()
        });

        // REDIRIGIMOS AL USUARIO AL LOGIN SI SE REGISTRO CORRECTAMENTE
        res.redirect('/user/login');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    validacionesRegistro,
    resultadoRegistro
};

