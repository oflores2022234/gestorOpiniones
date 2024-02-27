import { response, request } from "express";
import bcrypjs from 'bcryptjs';
import User from './user.model.js'

export const usersPost = async (req, res) => {

    const { name, lastName, email, username, phone, password} = req.body;
    const user = new User({name, lastName, email, username, phone, password});

    const salt = bcrypjs.genSaltSync();
    user.password = bcrypjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });

}

