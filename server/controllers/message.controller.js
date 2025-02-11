const { User } = require('../models');
const { Message } = require('../models');


module.exports.getMessages = async (req, res, next) => {
    try {
        //only query params,not existing body
        const messages = await Message.find().populate({
            path: 'userId',
            select: 'login'
        });
        if (!messages) {
            return next(new Error('Messages not found'));
        }
        res.status(200).send({ data: messages });
    } catch (error) {
        next(error);
    }
};

module.exports.createNewMessage = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const messageData = req.body;

        // Створюємо нове повідомлення
        const newMessage = await Message.create({ ...messageData, userId });
        
        if (!newMessage) {
            return res.status(400).send({ errors: [{ detail: 'Message not created' }] });
        }

        res.status(201).send({ data: newMessage });
    } catch (error) {
        next(error);
    }
};

module.exports.getMessagesByUser = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const messages = await Message.find({ userId }).sort({ createdAt: -1 });

        if (!messages.length) {
            return res.status(404).send({ errors: [{ detail: 'No messages found' }] });
        }

        res.status(200).send({ data: messages });
    } catch (error) {
        next(error);
    }
};

module.exports.deleteMessage = async (req, res, next) => {
    try {
        const { params: { messageId } } = req;
        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return res.status(404).send({ errors: [{ detail: 'Message not found' }] });
        }

        res.status(200).send({ data: deletedMessage });
    } catch (error) {
        next(error);
    }
};



module.exports.getMessage = async (req, res, next) => {
    try {
        const { params: { messageId } } = req;
        if (!messageId) {
            return res.status(400).send({ errors: [{ detail: 'Message ID is required' }] });
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).send({ errors: [{ detail: 'Message not found' }] });
        }
        res.status(200).send({ data: message });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserMessages = async (req, res, next) => {
    try {
        const { params: { userId } } = req; //only query params,not existing body
        if (!userId) {
            return res.status(400).send({ errors: [{ detail: 'User ID is required' }] });
        }
        const user = await User.findById(userId).populate('messages');
        if (!user) {
            return res.status(404).send({ errors: [{ detail: 'User not found' }] });
        }
        res.status(200).send({ data: user.messages });
    } catch (error) {
        next(error);
    }
};

module.exports.updateMessage = async (req, res, next) => {
    try {
        const { params: { messageId }, body } = req;
        const updatedMessage = await Message.findByIdAndUpdate(messageId, body, { new: true });
        if (!updatedMessage) {
            return res.status(404).send({ errors: [{ detail: 'Message not found' }] });
        }
        res.status(200).send({ data: updatedMessage });
    } catch (error) {
        next(error);
    }
};  
