const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config')[process.env.NODE_ENV || 'development'];


mongoose
    .connect(`mongodb://${config.hostName}:${config.port}/${config.dbName}`)
    .then(() => {
    console.log('Connected to MongoDB');
    })
    .catch((err) => {
    console.log(err);
    process.exit(1);
});

const currentFileName = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
    .filter((fileName) => fileName !== currentFileName && /[a-z]+\.js$/i.test(fileName))
    .forEach((fileName) => {
        const Model = require(path.resolve(__dirname, fileName));
        db[Model.modelName] = Model;
    });

module.exports = db;