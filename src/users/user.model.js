import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is obligatory"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is Obligatory"],
    },
    email: {
        type: String,
        required: [true, "Email is obligaroty"],
    },
    username: {
        type: String,
        required: [true, "Username is obligatory"],
    },
    phone: {
        type: String,
        required: [true, "Phone is obligatory"],
    },
    password: {
        type: String,
        required: [true, "Password is obligatory"],
    },
    dateBirth: {
        type: String,
        required: [true, "Birth is obligatory"],
    },
    gender: {
        type: String,
        required: [true, "Gender is obligatory"],
    },
    status: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}  
export default mongoose.model('User', UserSchema);