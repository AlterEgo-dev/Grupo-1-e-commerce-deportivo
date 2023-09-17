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
})
const upload =multer({storage})

module.exports={upload}
