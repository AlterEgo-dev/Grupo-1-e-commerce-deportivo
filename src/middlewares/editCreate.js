const path = require("path");
const { body } = require("express-validator");

//aca se hacen todas las validaciones del back tanto para el form de edit y create 
module.exports = [
    body('title').notEmpty().withMessage('Debe ingresar el nombre del producto'),
    body('gender').notEmpty().withMessage('Debe seleccionar un género'),
    body('category').notEmpty().withMessage('Debe seleccionar una categoría'),
    body('sizes').notEmpty().withMessage('Debe ingresar al menos un talle'),
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
        if(!req.files.imageDetail){
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
    body('price').notEmpty().withMessage('Debe ingresar el precio'),
    body('description')
    .notEmpty().withMessage('Debe ingresar la descripción del producto'),
    body('cuidados')
    .notEmpty().withMessage('Debe ingresar los cuidados del producto')
]