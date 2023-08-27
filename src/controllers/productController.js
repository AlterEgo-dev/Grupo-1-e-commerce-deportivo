const path = require('path');
const fs = require('fs');
const dataBase = require('../dataBase/productList.json');
const multer = require('multer');

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
  
  productEditForm: (req, res) => {
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('product-edit.ejs', { product, products: results });
  },
  
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
        title ? product.title = title : product.title;
        precio ? product.price = precio : product.price;
        sizes ? product.sizes = sizes : product.sizes;
        category ? product.category = category : product.category;
        descripcion ? product.description = descripcion : product.description;
        Cuidados ? product.cuidados = Cuidados : product.cuidados;
  
        if (req.files['image']) {

          if (product.image) {
            const oldImagePath = path.join(__dirname, '../../public', product.image);
            fs.unlinkSync(oldImagePath);
          }
  
          product.image = '/img/img-detalle/' + req.files['image'][0].filename;
        }
  
        // Agregar nuevas imágenes de detalle si se cargaron
        if (req.files['imageDetail']) {
          const newImages = req.files['imageDetail'].map(file => '/img/img-detalle/' + file.filename);
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
  }
};

module.exports = productController;