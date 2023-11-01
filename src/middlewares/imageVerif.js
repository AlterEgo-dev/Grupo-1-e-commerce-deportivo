const path = require("path");
const { body, validationResult } = require("express-validator");

module.exports = [
    body("img").custom((value, { req }) => {
        if (req.file) {
            const extensions = [".jpeg", ".jpg", ".png", ".gif"];
            const fileExtension = path.extname(req.file.originalname);

            if (!extensions.includes(fileExtension)) {
                throw new Error(
                    `Las extensiones de archivo permitidas son ${extensions.join(", ")}`
                );
            }
        }
        return true;
    }),
    (req, res, next) => {
        // Verificar si hubo errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];