const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9\s.,?!-]{3,}$/.test(value), 
            message: (props) => `${props.value} is not a valid message`,
        },
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});


const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

