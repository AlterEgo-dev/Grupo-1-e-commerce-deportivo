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
        let result = [];
        let promises = [];
        let subtotal = 0;
        req.session.miArray = req.session.miArray || [];
        if(req.session.miArray.length > 0){
            for (let i = 0; i < req.session.miArray.length; i++) {
                let promise = db.Product.findByPk(req.session.miArray[i])
                    .then((product) => {
                        result[i] = product;
                        subtotal += parseInt(product.Price);
                    });
                promises.push(promise);
            }
        
            Promise.all(promises)
                .then(() => {
                    res.render('carrito.ejs', { result, subtotal });
                    console.log(result);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error interno del servidor');
                });
        }else{
            result = null;
            res.render('carrito.ejs', { result, subtotal });
        }
    },
    carritoId: (req,res,next) => {
        const ids = req.params.id;
        req.session.miArray = req.session.miArray || [];
        const verifId = req.session.miArray.includes(ids);
        if(verifId == false){
            req.session.miArray.push(ids);
        }
        res.redirect("/carrito")
    },
    borrarCarrito: (req,res) => {
        const id = req.params.id;
        const nuevoArray = req.session.miArray.filter(idA => idA != id)
        req.session.miArray = nuevoArray;
        res.redirect("/carrito")
    }
}

module.exports = mainController;