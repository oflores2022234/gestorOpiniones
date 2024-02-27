import User from '../users/user.controller.js'

export const existEmails = async (email = '') => {
    const existEmail = User.findOne({email});
    if(existEmail){
        throw new Error(`The email ${email} already registered`);
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The id: ${email} don't exist`)
    }
}