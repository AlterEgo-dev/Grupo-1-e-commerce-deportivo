const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const mainRoute = require ('./src/routes/main');
const productRoute = require ('./src/routes/product');


const puerto = process.env.puerto || 8000;

app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

app.set ('view engin', 'ejs');
app.set('views', './src/views')

app.use ('/', mainRoute);
app.use ('/product', productRoute);

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en puerto ${puerto}`);
});