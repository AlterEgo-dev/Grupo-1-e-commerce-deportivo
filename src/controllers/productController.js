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
    upload.single('image'),
    (req, res) => {
      const { title, price, sizes, category, description, cuidados } = req.body;

      const imagePath = '/img/img-detalle/' + req.file.filename;

      const productoNuevo = {
        id: '',
        title: title,
        price: price,
        image: imagePath,
        imageDetail: ['',
         '',
         ''],
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

  saveEditedProduct: (req, res) => {
    const {id} = req.params;
    const {title, precio, sizes, category, descripcion, Cuidados } = req.body;
    const { results } = dataBase;

    const product = results.find((prod) => prod.id === id);
    if (product) {
      product.title = title;
      product.price = precio;
      product.sizes = sizes;
      product.category = category;
      product.description = descripcion;
      product.cuidados = Cuidados;


      const filePath = path.join(__dirname, '../dataBase/productList.json');
      fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2));
    
      res.redirect(`/product/detail/${id}`);
    } else {
      res.status(404).send('Producto no encontrado');
    }

  
  },
};

module.exports = productController;