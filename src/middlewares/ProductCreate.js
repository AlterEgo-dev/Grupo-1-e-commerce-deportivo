const { body, validationResult } = require('express-validator');

const productCreate = [
    body('title')
        .notEmpty().withMessage('Debe ingresar el nombre del producto')
        .isLength({min:2}).withMessage('El nombre del producto debe tener al menos dos carácteres'),
    body('description')
        .notEmpty().withMessage('Debe ingresar la descripción del producto'),
    body('gender')
        .notEmpty().withMessage('Debe seleccionar un género'),
    body('category')
        .notEmpty().withMessage('Debe seleccionar una categoría'),
    body('sizes')
        .notEmpty().withMessage('Debe ingresar al menos un talle'),
    body('price')
        .notEmpty().withMessage('Debe ingresar el precio'),
    body('cuidados')
        .notEmpty().withMessage('Debe ingresar los cuidados del producto')
]

const validarFormProduct = async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)

    if (!errors.isEmpty()) {
        return res.render('product-create', {
            errors: errors.mapped(),
            old: req.body},
            console.log(errors));
    }

    const { title, gender, description, price, category, sizes, cuidados } = req.body;
    const sizesString = sizes.join(', ');

    //IMAGE PRINCIPAL

    const image1 = req.files['image1'][0]; // SOLO TRAE LA POSICIÓN 0
    const image1String = image1 ? `/img/productos/${image1.filename}` : 'sin-foto.png';

    // SUBIDA DE IMAGE DETAIL

    const imageDetailFiles = req.files['imageDetail'];
    
    let imageDetailString = 'sin-foto.png';
    
      if (imageDetailFiles.length > 0) {
           imageDetailString = imageDetailFiles.map(file => `/img/productos/${file.filename}`).join(', ');
       } // UN MAP QUE NOS MUESTRE LOS FILES Y AL FINAL UN JOIN PARA CONVERTIRLO EN STRING

    try {
        await db.Product.create({
            Name: title,
            Description: description,
            Price: price,
            Image1: image1String,
            ImageDetail: imageDetailString,
            Care: cuidados,
            Category: category,
            Gender: gender,
            Size: sizesString,
        });
        
    } catch (error) {
        console.error(error);
    }
    
    next();
};

    

module.exports = {
    productCreate, validarFormProduct
};
