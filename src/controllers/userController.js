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
    }

}

module.exports = userController;