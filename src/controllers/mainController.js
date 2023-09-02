const path = require('path');
const dataBase = require('../dataBase/productList.json')

const mainController = {

    home:(req, res) => {
        const { results } = dataBase;
        res.render('home.ejs', {data: results});
    },

    carrito: (req, res) => {
        const { id } = req.params;
        const { results } = dataBase;
        const product = results.find((prod) => prod.id === id);
        res.render('carrito.ejs', { product });
    }
}

module.exports = mainController;