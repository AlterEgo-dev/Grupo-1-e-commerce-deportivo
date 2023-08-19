const path = require('path');
const dataBase = require('../dataBase/productList.json')

const mainController = {

    home:(req, res) => {
        const { results } = dataBase;
        
        res.render('home.ejs', {data: results});
    },
    register: (req, res) => {
        res.render('login-register.ejs');
    }
}

module.exports = mainController;