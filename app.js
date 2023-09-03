const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const mainRoute = require('./src/routes/main');
const productRoute = require('./src/routes/product');
const userRoute = require('./src/routes/user');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// DEFINIMOS SESSION

app.use(session({
    secret: 'cadena_secreta',
    resave: false,
    saveUninitialized: true,
}));

// Agregar cookie-parser middleware
app.use(cookieParser());

// UN MIDDLEWARE GLOBAL PARA VERIFICAR LA SESION
app.use((req, res, next) => {
    
    res.locals.isLoggedIn = req.session.userId ? true : false;
    next();

});

app.use(methodOverride('_method'));

const puerto = process.env.puerto || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));


app.set('view engine', 'ejs'); 
app.set('views', './src/views');

// Rutas
app.use('/', mainRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);

app.use((req, res) => {
    res.status(404).render('error-404');
  });

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en puerto ${puerto}`);
});
