import mongoose from 'mongoose';

const PublicacionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    comentarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario'
    }],
    gitHub:{
        type: String,
        required: true
    },
    imagenUrl:{
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publicacion', PublicacionSchema);
