import Comment from './comments.model.js';
import Publication from '../posting/posting.model.js';

export const commentPost = async (req, res) => {
    const { nombres, email, contenido, idPublicacion } = req.body;

    try {
        const publication = await Publication.findById(idPublicacion);

        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }
        

        const comment = new Comment({
            nombres,
            email,
            contenido,
            publicacion: idPublicacion
        });

        await comment.save();

        // Agregar el ID del comentario al arreglo de comentarios de la publicación
        publication.comentarios.push(comment._id);
        await publication.save();

        res.status(201).json({
            msg: 'Comentario agregado correctamente',
            comment
        });
        
    } catch (error) {
        console.error('Error, cannot add comment', error);
        res.status(500).json({ error: 'Error, cannot add comment'});
    }

};


export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};


/*
};
export const publicationsGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};
    

    const [total, publication] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    console.log(publication)

    res.status(200).json({
        total,
        publication
        
    });
};
*/

/*
export const commentPut = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;
    const { contenido } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'The comment does not exist' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to edit this comment' });
        }

        comment.contenido = contenido;

        await comment.save();

        res.status(200).json({ msg: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Error updating comment' });
    }
}

export const commentDelete = async (req, res) => {
    const user = req.usuario;
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'The comment does not exist' });
        }

        if (comment.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Error deleting comment' });
    }
};  

*/