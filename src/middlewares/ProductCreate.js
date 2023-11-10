const { body, validationResult } = require('express-validator');

const validacionProductCreate = [
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
            console.log(errors)
            );
    }

    next()
    
};

module.exports = {
    validacionProductCreate, validarFormProduct
};
