const path = require('path');
const dataBase = require('../dataBase/productList.json')

const mainController = {

    home:(req, res) => {
        const { results } = dataBase;
        
        res.render('home.ejs', {data: results});
    },

    popularHome: (req, res) => {
        const { data } = dataBase;
        res.render('home.ejs', { data: popularProduct });
    },       

    register: (req, res) => {
        res.render('login-register.ejs');
    },
    carrito: (req, res) => {
        const { id } = req.params;
        const { results } = dataBase;
        const product = results.find((prod) => prod.id === id);
        res.render('carrito.ejs', { product });
    }
}

module.exports = mainController;