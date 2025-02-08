const { User } = require('../models');
const mongoose = require('mongoose');

// Middleware para verificar se o usuário existe
const checkUserExists = async (req, res, next) => {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ errors: [{ detail: 'ID de usuário inválido' }] });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ errors: [{ detail: 'Usuário não encontrado' }] });
        }

        // Se o usuário existir, adiciona o usuário ao objeto `req` para uso posterior
        req.user = user;

        // Continua para a próxima função
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkUserExists;
