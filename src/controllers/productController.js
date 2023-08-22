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

  productEdit: (req, res) => {
    res.render('product-create.ejs');
  },

  productEditForm: (req, res) => {
    const { id } = req.params;
    const { results } = dataBase;
    const product = results.find((prod) => prod.id === id);
    res.render('product-edit.ejs', { product, products: results });
  },

  saveEditedProduct: (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const { results } = dataBase;

    const product = results.find((prod) => prod.id === id);
    if (product) {
      product.title = nombre;
      product.price = precio;


      const filePath = path.join(__dirname, '../dataBase/productList.json');
      fs.writeFileSync(filePath, JSON.stringify(dataBase, null, 2));
    
      res.redirect(`/product/detail/${id}`);
    } else {
      res.status(404).send('Producto no encontrado');
    }

  
  },
};

module.exports = productController;