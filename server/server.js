const http = require('http');
const Message = require('./models/Message');
const { Server } = require('socket.io')
const app = require('./app');
const port = process.env.PORT||3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

//технологія Socket.IO, яка викор. для реального часу комунікації між клієнтом і сервером у веб-додатках
//io — це глобальний об'єкт Socket.IO, який керує всіма з'єднаннями.
//socket — це конкретне з'єднання клієнта із сервером, яке дозволяє надсилати та отримувати повідомлення.
    io.on('connection', (socket) => {
        console.log('user connected to socket');
      //  socket.on('newMessage', async (dataMessage) => {
       //     try {
       //         console.log('New message: ', dataMessage);
       //         const message = await Message.create(dataMessage);
       //         if (!message) {
       //             return socket.emit('error', 'Message not created');
        //        }
        //        io.emit('newMessage', message);
        //    } catch (error) {
        //        socket.emit('error', error);
        //    }
        // });
        // Оновлений код на сервері для відправки повідомлень з інформацією про користувача:
socket.on("newMessage", async (messageData) => {
    try {
        const newMessage = await Message.create(messageData); // Створення повідомлення
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('userId', 'login email avatar'); // Завантажуємо дані користувача через populate
        
        io.emit("newMessage", populatedMessage); // Відправка вже заповненого повідомлення
        console.log("New message created:", populatedMessage);
    } catch (error) {
        console.error("Error saving message:", error);
    }
});

        socket.on('disconnect', (reason) => {
            console.log('user disconnected: '+reason);
        });
    });

server.listen(port, () => {
    console.log('Server running at port ' + port);
});