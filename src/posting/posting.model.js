import mongoose, { Schema } from "mongoose";

const PostingSchema = mongoose.Schema({
    tittle: {
        type: String,
        required: [true, "Tittle is obligatory"],
    },
    category: {
        type: String,
        required: [true, "Category is obligatory"],
    },
    pText: {
        type: String,
        required: [true, "Principal Text is obligatory"],
    },
    coments: {
        type: [Schema.Types.ObjectId],
        ref: 'Coments',
    },
    statuss: {
        type: Boolean,
        default: true,
    },
});

PostingSchema.Schema.toJSON = function(){
    const { __v, _id, ...posting} = this.toObject();
    posting.uid = _id;
    return posting;
}

export default mongoose.model('Posting', PostingSchema);