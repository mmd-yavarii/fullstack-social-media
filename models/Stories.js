import mongoose, { Schema, models, model } from 'mongoose';

const StorySchema = new Schema({
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

    views: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },

    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000,
        immutable: true,
    },
});

const Stories = models.Stories || model('Stories', StorySchema);
export default Stories;
