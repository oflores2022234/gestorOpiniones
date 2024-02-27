import { jwt } from "jsonwebtoken"
import Usuario from '../users/user.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: "No token in the peticion"
        });
    }

    

}