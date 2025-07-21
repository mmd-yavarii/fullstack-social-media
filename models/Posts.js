import mongoose, { Schema, models, model } from 'mongoose';

const PostSchema = new Schema({
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
        default: 'public/profiles/2.jpg',
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

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments', required: true }],
});

const Posts = models.Posts || model('Posts', PostSchema);
export default Posts;
