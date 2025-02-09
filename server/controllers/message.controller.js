const { Message } = require('../models');


module.exports.createMessage = async (req, res, next) => {
    try {
        const message = await Message.create(dataMessage);
        if (!message) {
            socket.emit('error', 'Message not created', () => { });
        }
        res.status(200).send({ data: message });
    } catch (error) {
        next(error);
    }
};