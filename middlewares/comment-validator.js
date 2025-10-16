import { check } from "express-validator";
import { validarCampos } from "./validate-values";
import { validateJWT } from "./jwt-verify.js";
import { existePost, existecomment, isCommentOwner } from "../helpers/db-validator.js";

export const createcommentValidator = [
    validateJWT,
    check("text", "El texto del comentario esmobligatorio").not().isEmpty(),
    check("text", "El comentario debe tener máximo 500 caracteres").isLength({ max: 500}),
    check("text", "El ID del post es obligatorio").not().isEmpty(),
    check("post", "El ID del post debe ser un ObjectId válido").isMongoId(),
    check("post").custom(existePost),
    validarCampos,
];