const express = require('express');
const cors = require('cors');

const {
    createOrFindUser,
    getUserById,
    updateUser,
    deleteUser,
    deleteManyUsers,
    getAllUsers } = require('./controllers/user.controller');




const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/users', createOrFindUser);
app.get('/users', getAllUsers);
app.get('/users/:userId', getUserById);
app.patch('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);
app.delete('/users', deleteManyUsers);



//jsonapi.org ---> Error Object
app.use((err, req, res) => {
    res.status(err.status || 500).send({
        errors: [{ detail: err.message }]
    });
});
 
module.exports = app