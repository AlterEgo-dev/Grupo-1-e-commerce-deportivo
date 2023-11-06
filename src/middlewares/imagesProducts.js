const path = require("path");
const { body, validationResult } = require("express-validator");

module.exports = [
    body("image1").custom((value, { req }) => {
        if (!req.files.image1) {
            throw new Error('Debe subir una imagen Principal');
        }else{
            const extensions = [".jpeg", ".jpg", ".png", ".gif"];
            const fileExtension = path.extname(req.files.image1[0].originalname);
        if(!extensions.includes(fileExtension)){
            throw new Error('Las extensiones de archivo permitidas son .jpeg, .jpg, .png, .gif');
            }
        }
        return true;
    }),
    body("imageDetail").custom((value, { req }) => {
        if(!req.files){
            throw new Error('Debe subir al menos una imagen de detalle');
        }else{
            const imageDetailFiles = req.files['imageDetail'];
            let imagedetailArray = imageDetailFiles.map(file => `/img/productos/${file.filename}`);
            const extensions = [".jpeg", ".jpg", ".png", ".gif"];
            let err = 0;
                for(let i = 0; i < imagedetailArray.length; i++){
                    if(!extensions.includes(path.extname(imagedetailArray[i]))){
                        err++
                    }
                }
            if(err >= 1){
                throw new Error('Las extensiones de archivo permitidas son .jpeg, .jpg, .png, .gif');
            }
        }    
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
