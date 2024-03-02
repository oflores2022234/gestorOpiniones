import { Router } from "express";
import { check } from "express-validator";


import {
publicationsPost,
publicationsGet,
publicationsPut,
publicationsDelete
} from "./posting.controller.js";

import { existPostById } from "../helpers/db-validators.js"

import { validateFields } from "../middlewares/validate-fields.js"
import { validarJWT } from "../middlewares/validate-jwt.js"

const router = Router();

router.post(
    "/add",
    [
        
        check("titulo", "El título es requerido").not().isEmpty(),
        check("categoria", "La categoría es requerida").not().isEmpty(),
        check("texto", "El texto es requerido").not().isEmpty(),
        validateFields,
        validarJWT
    ],
    publicationsPost
);

router.get("/", publicationsGet);

router.put(
    "/:id",
    [
        validarJWT,
        check("titulo", "El título es requerido").not().isEmpty(),
        check("categoria", "La categoría es requerida").not().isEmpty(),
        check("texto", "El texto es requerido").not().isEmpty(),
        validateFields
    ],
    publicationsPut
);

router.delete(
    "/:id",
    validarJWT, 
    publicationsDelete
);

export default router;