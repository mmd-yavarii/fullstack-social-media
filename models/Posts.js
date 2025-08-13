import mongoose, { Schema, models, model } from 'mongoose';

const PostSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
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

    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },

    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },

    taggedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },
});

const Posts = models.Posts || model('Posts', PostSchema);
export default Posts;
