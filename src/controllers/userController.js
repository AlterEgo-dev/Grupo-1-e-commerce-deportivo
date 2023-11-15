// const {results} = require('../dataBase/productList.json');
const db = require('../dataBase/models')
const fs = require ("fs")
const path = require ("path")

const multer = require ("multer");

const storage = multer.diskStorage({    
    destination: function (req, file, cb) {
        const rutaImg= path.join(__dirname, "..", "..", "public", "img", "img-perfil");
        cb (null, rutaImg)
    },
    filename: function (req, file, cb) {
        const {id}= req.params;
        const filename="perfil-"+id+Date.now()+path.extname(file.originalname);
        cb(null, filename)
    }
});

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
    
    perfil: async (req, res) => {
        try {
            // OBTENEMOS EL ID DEL USUARIO MEDIANTE PARAMS
            const { id } = req.params;
            // BUSCAMOS EL USUARIO EN LA BASE DE DATOS POR SU ID
            const user = await db.User.findByPk(id);
            // SI NO SE ENCUENTRA EL USUARIO, RENDERIZAMOS UNA PÁGINA DE ERROR 404
            if (!user) {
                return res.status(404).render('error-404.ejs');
            }
            // OBTENEMOS LOS DATOS DEL USUARIO
            let userToRender = user.dataValues;
            // SI SE HA SUBIDO UNA FOTO DE PERFIL, LA AGREGAMOS A LOS DATOS DEL USUARIO A RENDERIZAR
            if (req.file && req.file.filename) {
                userToRender.img = req.file.filename;
            } 
    
            // Obtener la cantidad total de productos
            const count = await db.Product.count();

            // Calcular un índice aleatorio
            const randomIndex = Math.floor(Math.random() * count);

            // Buscar el producto correspondiente al índice aleatorio
            const products = await db.Product.findOne({ offset: randomIndex });
            
            res.render('perfil.ejs', { user: userToRender, products, userId: id });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
    },
    
    
    navbar: (req, res) => {
        // VERIFICAMOS SI EL USUARIO ESTÁ LOGUEADO COMPARANDO SU ID DE SESIÓN
        const isLoggedIn = req.session.userId ? true : false;
        let isAdmin = false;
    
        // SI EL USUARIO ESTÁ LOGUEADO, COMPROBAMOS SI ES UN ADMINISTRADOR
        if (req.session.userId) {
            const datoUser = dataUser.find((User) => User.id == req.params.id);
            isAdmin = datoUser.category == "Admin" ? true : false;
        }
    
        // RENDERIZAMOS LA VISTA DE LA BARRA DE NAVEGACIÓN CON LA INFORMACIÓN DE LOGUEO Y ADMINISTRADOR
        res.render('navbar.ejs', { isLoggedIn, isAdmin });
    },
    
    subirFoto: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.User.findByPk(id);
    
            // SI SE HA ENVIADO UN ARCHIVO, ACTUALIZAMOS LA RUTA DE LA IMAGEN EN LA BASE DE DATOS
            const imagePath = `/img/img-perfil/${req.file.filename}`;

            await user.update({ Avatar: imagePath });
            return res.redirect("/user/perfil/" + id);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    
    eliminarFoto: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.User.findByPk(id);
    
            if (user) {
                if (user.Avatar) {
                    const imagePath = `/img/img-perfil/${user.Avatar}`;
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
    
                    // ACTUALIZAMOS LA RUTA DE LA IMAGEN EN LA BASE DE DATOS A UNA IMAGEN POR DEFECTO
                    await user.update({ Avatar: '/img/img-perfil/sin-perfil.png' });
                }
            }
    
            // REDIRIGIMOS AL USUARIO A SU PERFIL
            res.redirect("/user/perfil/" + id);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}
    
    const upload = multer({ storage });
    
    module.exports = { userController, upload };
