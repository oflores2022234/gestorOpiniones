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

export const postingPut = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...resto} = req.body;

    await Posting.findByIdAndUpdate(id, resto);

    const posting = await Posting.findOne({_id: id});

    res.status(200).json({
        msg: 'Update Post',
        posting
    });
}

export const postingDelete = async(req, res) =>{
    const{id} = req.params;

    const publication = await Posting.findByIdAndUpdate(id, {statuss: false});

    res.status(200).json({msg:'Deleted publication', publication});
}