// ACÁ HAY QUE TRAER DE LA BD DE TODOS LOS USUARIOS Y HACER UN RES.JSON PARA VER SOLO EL JSON DEL MISMO

const db = require('../../dataBase/models')

const apiUserController = {

    users: async (req, res) => {
        try {
            const usuarios = await db.User.findAll({
                attributes: ['id', 'UserName', 'Email']
            });
    
            const usuariosConURL = usuarios.map(usuario => {
                return {
                    id: usuario.id,
                    UserName: usuario.UserName,
                    Email: usuario.Email,
                    URL: `http://localhost:8000/api/users/${usuario.id}`
                };
            });
            const count = usuariosConURL.length;
    
            return res.json({ data: usuariosConURL, count });
        } catch (err) {
            console.log(err);
        }
    },

    getUsers: async(req, res) => {
        const { id } = req.params

        try {

            const usuarios = await db.User.findByPk(id, 
                {attributes: ['id', 'userName', 'Email']});

            return res.json({usuarios})
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = apiUserController;