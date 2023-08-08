const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const mainRoute = require ("./routes/main");
const productRoute = require ("./routes/product");


const puerto = process.env.puerto || 8000;

app.use(express.json());
app.use('/', express.static(__dirname + '/public'));
app.set ("view engine", "ejs" );

app.use ("/", mainRoute);
app.use ("/product", productRoute);

app.get('/login-register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/login-register.html'))
})

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en puerto ${puerto}`);
});