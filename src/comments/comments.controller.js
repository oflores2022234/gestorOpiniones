import Comment from './comments.model.js';
import User from '../users/user.model.js';
import Publication from '../posting/posting.model.js';

export const commentPost = async (req, res) => {
    const user = req.usuario;
    const { contenido, idPublicacion } = req.body;

    try {
        const publication = await Publication.findById(idPublicacion);

        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        const comment = new Comment({
            contenido,
            usuario: user._id,
            publicacion: idPublicacion
        });

        await comment.save();

        const usuario = await User.findById(user._id);

        res.status(201).json({
            msg: 'Comentario agregado correctamente',
            comment: {
                ...comment.toObject(),
                tituloPublicacion: publication.titulo,
                usuario: usuario.correo
            }
        });
        
    } catch (error) {
        console.error('Error, cannot add comment', error);
        res.status(500).json({ error: 'Error, cannor add comment'});
    }

};


export const getComments = async (req, res) => {
    try {
        const comment = await Comment.find().populate({
            path: 'usuario', 
            select: 'email _id' 
        });

        res.status(200).json(comment);
    } catch (error) {
        console.error('Error to get post:', error);
        res.status(500).json({ error: 'Error to get post' });
    }
};

