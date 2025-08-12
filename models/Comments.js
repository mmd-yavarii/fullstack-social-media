import mongoose, { Schema, models, model } from 'mongoose';

const CommentSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    authorUsername: {
        type: String,
        required: true,
    },

    authorImg: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const Comments = models.Comments || model('Comments', CommentSchema);
export default Comments;
