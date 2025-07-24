import mongoose, { Schema, model, models } from 'mongoose';

const NotifSchema = new Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    type: {
        type: String,
        enum: ['like', 'comment', 'follow'],
        required: true,
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        default: null,
    },

    message: {
        type: String,
        default: '',
    },

    isRead: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
});

const Notifs = models.Notifs || model('Notifs', NotifSchema);
export default Notifs;
