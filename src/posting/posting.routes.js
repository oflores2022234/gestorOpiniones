import { Router } from "express";
import { check } from "express-validator";

import {
postingPost,
postingGet
} from "./posting.controller.js";

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

export default router;