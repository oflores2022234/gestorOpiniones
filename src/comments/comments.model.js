import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
});

export default mongoose.model('Comment', CommentSchema);