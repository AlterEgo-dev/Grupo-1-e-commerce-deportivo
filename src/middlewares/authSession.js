const db = require('../dataBase/models');

// RETORNA AL HOME Y NO PERMITE INGRESAR AL FORM DE LOGIN Y REGISTER EN CASO DE ESTAR VERIFICADO

const authRedirectSession = (req, res, next) => {
    if (req.session && req.session.userId) { // requerimos si hay una sesion registrada
    
        return res.redirect('/'); // si la hay redirecciona para evitar que ingrese al login/register
    }
    next(); 
};

// VERIFICAMOS LA SESSION, EN CASO DE QUE NO ESTE LOGUEADO, REDIRECCIONA AL LOGIN

const authSession = (req, res, next) => {
    if (req.session && req.session.userId) { 
        return next();
    } else {
        return res.redirect('/user/login');
    }
};

const adminSession = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/user/login');
    }

    db.User.findByPk(req.session.userId)
        .then((user) => {
            if (!user) {
                return res.status(404).render('error-404');
            }

            if (user.Role === 'Admin') {
                return next();
            } else {
                return res.status(404).render('error-404');
            }
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        });
}

module.exports = {
    authRedirectSession,
    authSession,
    adminSession
};