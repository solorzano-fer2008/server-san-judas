import { check } from 'express-validator'
import { validarCampos } from './validate-values.js'
import { validateJWT } from './jwt-verify.js'


export const createpostValidator = [
    validateJWT,
    check ('title','El titulo es obligatorio'). not().isEmpty(),
    check ('title', 'El titulo no debe exceder los 100 carateres').isLength({ max: 100}),
    check ('content', 'El contenido es obligatorio').not().isEmpty(),
    validarCampos
]