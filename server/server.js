const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const User = require('./models/User');
const Message = require('./models/Message');
const constants = require('./utils/constants');

const {
    WS_EVENTS: {
        NEW_MSG,
        BAD_MSG,
        ORIGIN,
        METHODS
    }
} = constants;


const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        methods: METHODS
    }
});

io.on("connection", (socket) => {
    console.log("User connected to socket");

    socket.on(NEW_MSG, async (messageData) => {
        try {
            // Перевірка на дублювання повідомлень
            const existingMessage = await Message.findOne({ uniqueId: messageData.uniqueId });
            if (existingMessage) {
                console.log("Message already exists:", messageData.uniqueId);
                return socket.emit("badMessage", "Message already exists");
            }

            // Отримуємо інформацію про користувача за допомогою userId
            const user = await User.findById(messageData.userId);
            if (!user) {
                return socket.emit("badMessage", "User not found");
            }

            // Створюємо нове повідомлення з додатковою інформацією
            const newMessage = await Message.create(messageData);

            if (!newMessage) {
                return socket.emit("badMessage", "Message not created");
            }
             // Популяція поля userId для отримання login користувача
            const populatedMessage = await Message.findById(newMessage._id)
                .populate({ path: 'userId', select: 'login' }); // Додаємо login користувача

            // Відправляємо повідомлення з login користувача
            io.emit(NEW_MSG, populatedMessage);
            console.log("New message created with user login:", populatedMessage);

            // Відправляємо нове повідомлення всім підключеним клієнтам
            io.emit(NEW_MSG, newMessage);
            console.log("New message created:", newMessage);
        } catch (error) {
            console.error("Error saving message:", error);
            socket.emit(BAD_MSG, "An error occurred while saving the message");
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