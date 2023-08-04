const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const puerto = process.env.puerto || 8000;

app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/home.html'))
})

app.get('/login-register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/login-register.html'))
})

app.get('/detalle-producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/detalle-producto.html'))
})

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en puerto ${puerto}`);
});