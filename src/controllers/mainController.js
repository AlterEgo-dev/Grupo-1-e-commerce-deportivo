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
        res.render('carrito.ejs');
    }
}

module.exports = mainController;