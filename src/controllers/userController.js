const userController = {

    formLogin: (req, res) => {
        res.render('login.ejs');
    },

    login: (req, res) =>{
        res.send('Logueado')
    },


    formRegister: (req, res) => {
        res.render('register.ejs')
    },

    register: (req, res) => {
        res.redirect('/')
    }

}

module.exports = userController;