import { Router } from "express";
import { check } from "express-validator";

import {
    commentPost,
    getComments
} from "./comments.controller.js";

import { validateFields } from "../middlewares/validate-fields.js"
import { validarJWT } from "../middlewares/validate-jwt.js"

const router = Router();

router.post(
    "/add",
    [
        check("contenido", "The content is obligatory").not().isEmpty(), // Ajusta los mensajes de error según sea necesario
        check("idPublicacion", "The publication ID is obligatory").not().isEmpty(),
        validateFields,
        validarJWT
    ],
    commentPost
);

router.get("/", getComments);

export default router;