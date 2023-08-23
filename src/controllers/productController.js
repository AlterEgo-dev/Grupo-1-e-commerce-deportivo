const path = require('path');
const fs = require('fs');
const dataBase = require('../dataBase/productList.json');

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

productCreatePush: (req, res) => {
  const { title, price, image, imageDetail, sizes, category, description, cuidados } = req.body;

  const productoNuevo = {
    id: '',
    title: title,
    price: price,
    image: '/img/img-detalle/Z1.jpg',
    imageDetail: [
      '/img/img-detalle/Z1.jpg',
      '/img/img-detalle/Z1.jpg',
      '/img/img-detalle/Z1.jpg'
    ],
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
},

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