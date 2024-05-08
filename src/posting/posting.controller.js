import Publication from './posting.model.js';

export const publicationsPost = async (req, res) => {

    const { titulo, categoria, texto, imagenUrl } = req.body;

    try {
        const publication = new Publication({
            titulo,
            categoria,
            texto,
            imagenUrl,
        });

        await publication.save();
        console.log(publication)


        res.status(200).json({
            msg: 'Post added succesfully',
            publication
        });
    } catch (error) {
        console.error('Error to add post:', error);
        res.status(500).json({ error: 'Error to add post' });
    }
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

    /*console.log(publication)*/

    res.status(200).json({
        total,
        publication
        
    });
};

/*
export const companyGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        companies
    });
}
*/



/*
export const publicationsPut = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;
    const { titulo, categoria, texto } = req.body;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'The post don´t exist' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to edit this post' });
        }

        publication.titulo = titulo;
        publication.categoria = categoria;
        publication.texto = texto;

        await publication.save();

        res.status(200).json({ msg: 'Post update succesfully', publication });
    } catch (error) {
        console.error('Error to update post:', error);
        res.status(500).json({ error: 'Error to update post' });
    }
};

export const publicationsDelete = async (req, res) => {
    const user = req.usuario;
    const publicationId = req.params.id;

    try {
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({ msg: 'The post do not exist' });
        }

        if (publication.usuario.toString() !== user._id.toString()) {
            return res.status(403).json({ msg: 'You do not have access to delete this post' });
        }

        await Publication.findByIdAndDelete(publicationId);

        res.status(200).json({ msg: 'Post delete succesfully' });
    } catch (error) {
        console.error('Error to delete post:', error);
        res.status(500).json({ error: 'Error to delete post' });
    }
};
*/
