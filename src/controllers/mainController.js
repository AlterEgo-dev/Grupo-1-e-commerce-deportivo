const path = require('path');
// const dataBase = require('../dataBase/productList.json')
const db =require ("../dataBase/models")

const mainController = {

    home: (req, res) => {
        const id = req.session.id;
        db.Product.findAll()
        .then((data) => {
        return res.render("home", {data, id});})
    },
    
    carrito: (req, res) => {
        const { id } = req.params;
        const { results } = dataBase;
        const result = results.find((prod) => prod.id === id);
        res.render('carrito.ejs', { result });
    }
}

module.exports = mainController;