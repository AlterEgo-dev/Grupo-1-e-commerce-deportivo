const path = require('path');
const dataBase = require('../dataBase/productList.json')

const mainController = {

    home:(req, res) => {
        const { results } = dataBase;
        res.render('home.ejs', {data: results});
    },

    carrito: (req, res) => {
<<<<<<< HEAD
        res.render('carrito.ejs');
    },

=======
        const { id } = req.params;
        const { results } = dataBase;
        const product = results.find((prod) => prod.id === id);
        res.render('carrito.ejs', { product });
    }
>>>>>>> 0eacb81c47b40fb5789da03ed995747de4464e04
}

module.exports = mainController;