import bcryptjs from 'bcryptjs'
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) =>{
    const {correo, password, username} = req.body;

    try {
        const userCorreo = await Usuario.findOne({ correo });

        const userUsername = await Usuario.findOne({ username });

        const usuario = userCorreo || userUsername;

        if(!usuario){
            return res.status(400).json({
                msg: "Incorrect credential, Email or username don't exist in te DataBase",
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "User doen't exist in the DataBase",
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: "Nice Login!!",
            usuario,
            token
        });
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact with the administrador"
        });
    }

}