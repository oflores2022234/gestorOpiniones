
import Posting from '../posting/posting.model.js'


export const existPostById = async (id = '') => {
    const existPost = await Posting.findById(id);
    if(!existPost){
        throw new Error(`The id: ${tittle} don't exist`)
    }
}