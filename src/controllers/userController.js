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
        res.redirect('/user/login')
    },
    
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar la sesión:', err);
            }
            res.redirect('/');
        });
    },

        navbar: (req, res) => {
            const isLoggedIn = req.session.userId ? true : false;
            res.render('navbar.ejs', { isLoggedIn });
        }
    };

module.exports = userController;
