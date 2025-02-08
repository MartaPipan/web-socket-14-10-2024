const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true, // Видалення пробілів на початку і в кінці
        validate: {
            validator: (value) => /^[A-Za-z0-9_-]{3,16}$/.test(value), 
            message: (props) => `${props.value} is not a valid login`,    
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),  
            message: (props) => `${props.value} is not a valid email`,
        }
    },
    messages: [
        {
            type: mongoose.SchemaTypes.ObjectId, 
            ref: 'Message',
        },
    ],
}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
