const { User } = require('../models');
const { Message } = require('../models');

module.exports.createUser = async (req, res, next) => {
    try {
        const { body } = req;
        const user = await User.create(body);
        if (!user) {
            return next(new Error('User not created'));
        }
        res.status(201).send({ data:user });
} catch (error) {
 next(error);
}
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            return next(new Error('Users not found'));
        }
        res.status(200).send({ data: users });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserById = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        if (!userId) {
            return res.status(400).send({ errors: [{ detail: 'User ID is required' }] });
        }

        const user = await User.findById(userId).populate({
            path: 'messages', select: 'content'});
        if (!user) {
            return res.status(404).send({ errors: [{ detail: 'User not found' }] });
        }

        res.status(200).send({ data: user });
    } catch (error) {
        next(error);
    }
};


module.exports.updateUser = async (req, res, next) => {
    try {
        const { params: { userId }, body } = req;
        const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ errors: [{ detail: 'User not found' }] });
        }
        
        res.status(200).send({ data: updatedUser });
    } catch (error) {
        next(error); 
    }
};


module.exports.deleteUser = async (req, res, next) => {
    try {
        const {
            params: { userId },
        } = req;
        const user = await User.findByIdAndDelete(userId);
         if (!user) {
            return res.status(404).send({ errors: [{ detail: 'User not found' }] });
        }
        await Message.deleteMany({ userId: userId });
        res.status(200).send({ data: user });
    } catch (error) {
        next(error);
    }
};

module.exports.deleteManyUsers = async (req, res, next) => {
    try {
        const { params: { userId } } = req;
        const deletedUsers = await User.deleteMany(userId);
        if (!deletedUsers) {
            return res.status(404).send({ errors: [{ detail: 'Users not found' }] });
        }
        res.status(200).send({ data: deletedUsers });
    } catch (error) {
        next(error);
    }
};
