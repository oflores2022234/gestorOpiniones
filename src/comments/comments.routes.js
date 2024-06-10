import { Router } from "express";
import { check } from "express-validator";

import {
    commentPost,
    getComments,
    //commentPut,
    //commentDelete
} from "./comments.controller.js";

import { validateFields } from "../middlewares/validate-fields.js"
//import { validarJWT } from "../middlewares/validate-jwt.js"

const router = Router();

router.post(
    "/add",
    [
        check("nombres", "The name is obligatory").not().isEmpty(),
        check("email", "The email is obligatory").isEmail(),
        check("contenido", "The content is obligatory").not().isEmpty(), // Ajusta los mensajes de error según sea necesario
        check("idPublicacion", "The publication ID is obligatory").not().isEmpty(),
        validateFields,
        //validarJWT
    ],
    commentPost
);

router.get("/", getComments);


/*
router.put(
    "/:id",
    [
        validarJWT,
        check("contenido", "The content is obligatory").not().isEmpty(),
        validateFields
    ],
    commentPut
);

router.delete(
    "/:id",
    validarJWT, 
    commentDelete
);
*/
export default router;