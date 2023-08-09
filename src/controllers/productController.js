const path = require('path');
const dataBase = require('../dataBase/productList.json')

const productController = {
  

    productDetail: (req, res) => {
        const { id } = req.params;
        const { results } = dataBase;
        const product = results.find((prod) => prod.id === id );
        res.render('detalle-producto.ejs', { product, products: results });
    }
}


module.exports = productController;