import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },

    fullName: {
        type: String,
        default: '',
    },

    bio: {
        type: String,
        default: '',
    },

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const Users = models.Users || model('Users', UserSchema);

export default Users;
