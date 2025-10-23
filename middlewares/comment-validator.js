import { check } from "express-validator";
import { validarCampos } from "./validate-values.js";
import { validateJWT } from "./jwt-verify.js";
import { postExists } from "../helpers/db-validator.js";

export const createcommentValidator = [
    validateJWT,
    check("text", "El texto del comentario esmobligatorio").not().isEmpty(),
    check("text", "El comentario debe tener máximo 500 caracteres").isLength({ max: 500}),
    check("text", "El ID del post es obligatorio").not().isEmpty(),
    check("post", "El ID del post debe ser un ObjectId válido").isMongoId(),
    check("post").custom(postExists),
    validarCampos,
];