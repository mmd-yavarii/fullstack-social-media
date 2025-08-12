import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },

    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },

    followings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },

    savedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Posts',
        default: [],
    },

    stories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Stories',
        default: [],
    },
});

const Users = models.Users || model('Users', UserSchema);
export default Users;
