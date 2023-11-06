// ACÁ HAY QUE TRAER DE LA BD DE TODOS LOS USUARIOS Y HACER UN RES.JSON PARA VER SOLO EL JSON DEL MISMO

const db = require('../../dataBase/models')

const apiUserController = {

     users: async (req, res) => {

        try {
            const usuarios = await db.User.findAll(
                {attributes: ['id', 'UserName', 'Email']}
            );

            const count = usuarios.length

            return res.json({data: usuarios, count})

        }catch(err) {
        console.log(err)
    }

    } 
}

module.exports = apiUserController;