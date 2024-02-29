import { Router } from "express";
import { check } from "express-validator";

import {
postingPost,
postingGet,
postingPut,
postingDelete
} from "./posting.controller.js";

import { existPostById } from "../helpers/db-validators.js"

import { validateFields } from "../middlewares/validate-fields.js"

const router = Router();

router.post(
"/",
[
    check("tittle", "The tittle is obligatory").not().isEmpty(),
    check("category", "The category is obligatory").not().isEmpty(),
    check("pText", "The Principal Text is obligatory").not().isEmpty(),
    validateFields,
],
postingPost
);

router.get("/", postingGet);

router.put(
    "/:id",
    [
        check("id", "Isn't not a ID valid").isMongoId(),
        check("id").custom(existPostById),
        validateFields,
    ], postingPut)

router.delete(
    "/:id",
    [
        check("id", "Incorrect Id").isMongoId(),
        check("id").custom(existPostById),
        validateFields
    ], postingDelete);

export default router;