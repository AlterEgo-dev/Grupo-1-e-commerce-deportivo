const {results} = require('../dataBase/users.json');
const dataBaseProduct = require('../dataBase/productList.json');


const userController = {

    formLogin: (req, res) => {
        res.render('login.ejs');
    },

    login: (req, res) =>{
        res.redirect('/')
    },


    formRegister: (req, res) => {
        res.render('register.ejs')
    },

    register: (req, res) => {
        res.redirect('/login')
    },

    perfil: (req, res) => {
        /*id user*/
        const { id } = req.params;
        const user = results.find((e) => e.id === id);
     
        /*producto aleatorio*/
        const randomIndex = Math.floor(Math.random() * dataBaseProduct.results.length);
        const products = dataBaseProduct.results[randomIndex];

        res.render('perfil.ejs', {user, products})
    }

}

module.exports = userController;