const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Імпортуємо функцію для генерації унікальних ID


const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9\s.,?!:;?"'@#$%^&*()_+-]{2,}$/.test(value), 
            message: (props) => `${props.value} is not a valid message`,
        },
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    uniqueId: {  // Додаємо унікальний ідентифікатор
        type: String,
        default: uuidv4,  // Генеруємо унікальний ID для кожного повідомлення
        unique: true,  // Забезпечуємо унікальність цього поля
    },
}, {
    timestamps: true, 
    versionKey: false   
});


const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
