import mongoose, { Schema, models, model } from 'mongoose';

const CommentsSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    authorusername: {
        type: String,
        required: true,
    },

    authorimage: {
        type: String,
        default: '',
    },

    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
});

const Comments = models.Comments || model('Comments', CommentsSchema);
export default Comments;
