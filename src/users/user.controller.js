import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';


export const usuariosPost = async (req, res) => {


    const {nombre, correo, username,password} = req.body;
    const usuario = new User( {nombre, correo, username,password} );

    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    res.status(200).json({
        usuario
    });
}

export const usuariosGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

export const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, correo, passwordAnterior, ...resto} = req.body;

    const usuario = await User.findById(id);

    const passwordValida = await bcryptjs.compare(passwordAnterior, usuario.password);

    if(!passwordValida){
        return res.status(401).json({ msg: "Contraseña anterior incorrecta" });
    }

    if(resto.password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const usuarioActualizado = await User.findById(id);

    res.status(200).json({
        msg: 'Usuario Actualizado',
        usuario: usu
    });
}