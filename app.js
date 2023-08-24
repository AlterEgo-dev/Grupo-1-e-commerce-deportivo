const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Agrega esta línea
const app = express();
const mainRoute = require ('./src/routes/main');
const productRoute = require ('./src/routes/product');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

const puerto = process.env.puerto || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // Corrige el typo en 'view engine'
app.set('views', './src/views');

// Configuración de almacenamiento y opciones de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/img/img-detalle'));
  
   // Ajusta la ruta de destino según tu estructura
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

app.use ('/', mainRoute);
app.use ('/product', productRoute);

app.listen(puerto, () => {
    console.log(`Aplicación corriendo en puerto ${puerto}`);
});