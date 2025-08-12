import mongoose, { Schema, models, model } from 'mongoose';

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

    message: {
        type: String,
        required: true,
    },

    isRead: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const Notifs = models.Notifs || model('Notifs', NotifSchema);
export default Notifs;
