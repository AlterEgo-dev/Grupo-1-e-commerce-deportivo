const path = require('path');
const dataBase = require('../dataBase/productList.json')

const mainController = {

    home:(req, res) => {
        const { results } = dataBase;
        res.render('home.ejs', {data: results});
    },

    carrito: (req, res) => {
        res.render('carrito.ejs');
    }
}

module.exports = mainController;