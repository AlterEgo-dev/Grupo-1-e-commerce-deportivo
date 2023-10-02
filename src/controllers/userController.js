const {results} = require('../dataBase/productList.json');
let usuarios = require('../dataBase/users.json');
const fs = require ("fs")
const path = require ("path")
const usersFile = path.join(__dirname, "..", "dataBase", "users.json");

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
    
    perfil: (req, res) => {
        /*id user*/
        const { id } = req.params;
        const user = usuarios.find((e) => e.id === id);
        let userToRender = user;
        
        /*cargar la nueva imagen de perfil aca para pasar una sola img en la vista*/
        if (req.file && req.file.filename) {
            user.img = req.file.filename;
            fs.writeFileSync(usersFile, JSON.stringify(usuarios, null, 2));
            userToRender = user;
        } 
        
        /*producto aleatorio*/
        const randomIndex = Math.floor(Math.random() * results.length);
        const products = results[randomIndex];

        res.render('perfil.ejs', {user:userToRender, products, userId: id})
    },
    
    navbar: (req, res) => {
        const isLoggedIn = req.session.userId ? true : false;
        let isAdmin = false;
            if(req.session.userId){
            const datoUser = dataUser.find((User) => User.id == req.params.id)
            isAdmin = datoUser.category == "Admin" ? true : false;
        }
        res.render('navbar.ejs', { isLoggedIn, isAdmin });
    },
    /*sobreescribir la foto de perfil predeterminada*/
    subirFoto: (req, res) => {
        const {id} = req.params
        const usuario = usuarios.find((user) => user.id === id);

        if (req.file) {
            usuario.img = req.file.filename;
            fs.writeFileSync(usersFile, JSON.stringify(usuarios, null, 2));
        } 

        res.redirect("/user/perfil/"+id)
    },
    eliminarFoto: (req, res) => {
        const {id} = req.params;
        const usuario = usuarios.find((user) => user.id === id);
        usuario.img="sin-perfil.png";
  
        fs.writeFileSync(usersFile, JSON.stringify(usuarios));        
        
        res.redirect("/user/perfil/"+id);
    }
};

module.exports = userController;
