const multer = require ("multer");
const path = require ("path");


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

const authEditProfile = (req, res, next) => {
    const profileId = req.params.id; // requerimos el id del usuario
    const userId = req.session.userId; // requrimos id de session

    if (userId === profileId) { // comparamos
        
        return next(); // next si coinciden
    } else {
        return res.redirect("/user/perfil/"+profileId) // redireccion si no coinciden
    }
};

const upload =multer({storage})

module.exports={
    upload,
    authEditProfile
}
