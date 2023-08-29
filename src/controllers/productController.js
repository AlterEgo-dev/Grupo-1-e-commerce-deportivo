const path = require('path');
const fs = require('fs');
const dataBase = require('../dataBase/productList.json');
const multer = require('multer');
const { log } = require('console');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img/img-detalle'));

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'Z1-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

/** AQUI ACABA MULTER */

/** CONTROLADORES  */

const productController = {
  productDetail: (req, res) => {
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('detalle-producto.ejs', { product, products: results });
  },

  productAdminList: (req, res) => {
    const { results } = dataBase;
    res.render('product-admin.ejs', { data: results });
  },

  productCreate: (req, res) => {
    res.render('product-create.ejs');
  },



  /** CREAR NUEVO PRODUCTO */

  productCreatePush: [
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'imageDetail', maxCount: 3 }
    ]),
    (req, res) => {
      const { title, price, sizes, category, description, cuidados } = req.body;
  
      const imagePath = '/img/img-detalle/' + req.files['image'][0].filename;
      const imagePathDetail = req.files['imageDetail'].map(file => '/img/img-detalle/' + file.filename);
  
      const productoNuevo = {
        id: '',
        title: title,
        price: price,
        image: imagePath,
        imageDetail: imagePathDetail,
        sizes: sizes,
        category: category,
        description: description,
        cuidados: cuidados
      };
  
      const filePath = path.join(__dirname, '../dataBase/productList.json');
      const productJson = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(productJson);
  
      const lastId = jsonData.results.length > 0 ? parseInt(jsonData.results[jsonData.results.length - 1].id) : 0;
      productoNuevo.id = (lastId + 1).toString();
  
      jsonData.results.push(productoNuevo);
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  
      res.redirect('/product/product-admin');
    }
  ],

  /** RENDERIZACION DE LA VISTA  */
  
  productEditForm: (req, res) => {
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('product-edit.ejs', { product, products: results });
  },

  /** BORRAR LA IMAGEN DE UN PRODUCTO */
  
  deleteImage: (req, res) => {
    const { id, index } = req.params;
    const product = dataBase.results.find((prod) => prod.id === id);
  
    if (product) {
      if (index >= 0 && index < product.imageDetail.length) {
        product.imageDetail.splice(index, 1);
        const filePath = path.join(__dirname, '../dataBase/productList.json');
        fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2), 'utf-8');
      }
    }
  
    res.redirect(`/product/product-edit/${id}`);
  },

  /** EDICIÓN DE PRODUCTO / ACTUALIZAR IMG PRINCIPAL */

  saveEditedProduct: [
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'imageDetail', maxCount: 3 }
    ]),
    (req, res) => {
      const { id } = req.params;
      const { title, precio, sizes, category, descripcion, Cuidados } = req.body;
      const { results } = dataBase;
  
      const product = results.find((prod) => prod.id === id);
      if (product) {
        product.title = title || product.title;
        product.price = precio || product.price;

        /** ACA FILTRA EL ARRAY DE TALLES */
  
        if (Array.isArray(sizes)) {
          product.sizes = sizes.filter(size => size !== '');

        /** EN CASO DE NO HABER OPCION, RELLENA CON ESPACIO VACIO PARA QUE ACTUE EL ELSE IF DEL DETALLE DE PRODUCTO */

        } else {
          product.sizes = sizes ? [sizes] : [];
        }
  
        product.category = category || product.category;
        product.description = descripcion || product.description;
        product.cuidados = Cuidados || product.cuidados;
  
        if (req.files['image']) {
          if (product.image) {
            const oldImagePath = path.join(__dirname, '../../public', product.image);
            fs.unlinkSync(oldImagePath);
          }
          product.image = '/img/img-detalle/' + req.files['image'][0].filename;
        }
  
        if (req.files['imageDetail']) {
          const newImages = req.files['imageDetail'].map(
            (file) => '/img/img-detalle/' + file.filename
          );
          product.imageDetail = product.imageDetail.concat(newImages);
        }
  
        const filePath = path.join(__dirname, '../dataBase/productList.json');
        fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2));
  
        res.redirect(`/product/detail/${id}`);
      } else {
        res.status(404).send('Producto no encontrado');
      }
    }
  ],
  
  
  
  /** BORRAR UN PRODUCTO */
  
   deleteProduct: (req, res) => {
    const idProd = req.params.id; 
    const ind = dataBase.results.findIndex(product => product.id === idProd);

    if (ind !== -1) {
        dataBase.results.splice(ind, 1);
        const dbFilePath = path.join(__dirname, '../dataBase/productList.json');
        fs.writeFileSync(dbFilePath, JSON.stringify(dataBase, null, 4));
    }

    res.redirect('/product/product-admin'); 
  },


  /** BORRAR LAS IMAGENES DE DETALLE  */
  
  deleteProductImage: (req, res) => {
    const { id, index } = req.params;
    const product = dataBase.results.find(prod => prod.id === id);
  
    if (product) {
      if (index >= 0 && index < product.imageDetail.length) {

        if (product.imageDetail.length > 1) {
          product.imageDetail.splice(index, 1);
  
          const filePath = path.join(__dirname, '../dataBase/productList.json');
          fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2), 'utf-8');
        }
      }
    }
  
    res.redirect(`/product/product-edit/${id}`);
  },
  genero: (req, res) => {
    const selectedGenero = req.params.genero;
    const { results } = dataBase;
    const result = results.filter((e)=>{
      return e.genero == selectedGenero
    })
    res.render("product-category", { result })
  },
  category: (req, res) => {
    const selectedCategory = req.params.category;
    const { results } = dataBase;
    const result = results.filter((e)=>{
      return e.category == selectedCategory
    })
    res.render("product-category", { result })
  },
};

module.exports = productController;