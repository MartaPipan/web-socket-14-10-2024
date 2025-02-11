const http = require('http');
const Message = require('./models/Message');
const { Server } = require('socket.io');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected to socket");

    socket.on("newMessage", async (messageData) => {
        try {
            const newMessage = await Message.create(messageData); // Створення повідомлення

            if (!newMessage) {
                return socket.emit("error", "Message not created"); // Перевірка на помилку створення
            }

            const populatedMessage = await Message.findById(newMessage._id)
                .populate("userId", "login email"); // Завантаження даних користувача

            io.emit("newMessage", populatedMessage); // Відправка заповненого повідомлення
            console.log("New message created:", populatedMessage);
        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit("error", "An error occurred while saving the message"); // Відправка помилки клієнту
        }
    });

    socket.on("disconnect", (reason) => {
        console.log("User disconnected:", reason);
    });
});

server.listen(port, () => {
    console.log("Server running at port " + port);
});


//технологія Socket.IO, яка викор. для реального часу комунікації між клієнтом і сервером у веб-додатках
//io — це глобальний об'єкт Socket.IO, який керує всіма з'єднаннями.
//socket — це конкретне з'єднання клієнта із сервером, яке дозволяє надсилати та отримувати повідомлення.
    