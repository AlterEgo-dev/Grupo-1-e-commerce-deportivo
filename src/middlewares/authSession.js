const arrData = require('../dataBase/users.json');

// RETORNA AL HOME Y NO PERMITE INGRESAR AL FORM DE LOGIN Y REGISTER EN CASO DE ESTAR VERIFICADO

const authRedirectSession = (req, res, next) => {
    if (req.session && req.session.userId) {
    
        return res.redirect('/');
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
    if(req.session.userId){
        let iduser = req.session.userId
        const usuario = arrData.find((prod) => prod.id == iduser);
        if(usuario.category == "Admin"){
            return next();
        }else if(usuario.category == "User"){
            return res.status(404).render('error-404')
        }
    }else{
        return res.redirect('/user/login');
    }

}
module.exports = {
    authRedirectSession,
    authSession,
    adminSession
};