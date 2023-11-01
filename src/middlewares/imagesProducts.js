const path = require("path");
const { body, validationResult } = require("express-validator");

module.exports = [
    body("image1").custom((value, { req }) => {
        console.log(req.files);
        if (req.files) {
            const extensions = [".jpeg", ".jpg", ".png", ".gif"];
            const fileExtension = path.extname(req.files.image1[0].originalname);

            if (!extensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son ${extensions.join(", ")}`
                );
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
//falta hacer el de las imagenes detail, despues lo hago.