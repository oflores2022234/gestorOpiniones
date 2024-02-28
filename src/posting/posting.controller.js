import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Posting from './posting.model.js';

export const postingPost = async (req, res) => {
    const {tittle, category, pText} = req.body;
    const posting = new Posting( {tittle, category, pText} );

    await posting.save();

    res.status(200).json({
        posting
    });
}