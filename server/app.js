const express = require('express');
const cors = require('cors');

const {
    createOrFindUser,
    getUserById,
    updateUser,
    deleteUser,
    deleteManyUsers,
    getAllUsers
} = require('./controllers/user.controller');

const {
    createNewMessage,
    getMessage,
    getMessages,
    updateMessage,
    deleteMessage
} = require('./controllers/message.controller'); 



const app = express();
app.use(cors());
app.use(express.json());

//app.get('/', (req, res) => {res.send('Hello World!');});
app.get('/', getMessages); 


app.post('/users', createOrFindUser);
app.get('/users', getAllUsers);
app.get('/users/:userId', getUserById);
app.patch('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);
app.delete('/users', deleteManyUsers);


app.post('/users/:userId/messages', createNewMessage); 
app.get('/users/:userId/messages/:messageId', getMessage); 
app.patch('/users/:userId/messages/:messageId', updateMessage);  
app.delete('/users/:userId/messages/:messageId', deleteMessage);



//jsonapi.org ---> Error Object
app.use((err, req, res) => {
    res.status(err.status || 500).send({
        errors: [{ detail: err.message }]
    });
});
 
module.exports = app