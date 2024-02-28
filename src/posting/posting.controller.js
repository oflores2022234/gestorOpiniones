import { response, request } from "express";
import Posting from './posting.model.js';

export const postingPost = async (req, res) => {
    const {tittle, category, pText} = req.body;
    const posting = new Posting( {tittle, category, pText} );

    await posting.save();

    res.status(200).json({
        posting
    });
}

export const postingGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {statuss: true};

    const [total, posting] = await Promise.all([
        Posting.countDocuments(query),
        Posting.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        posting
    });
}