import axios from "axios";
import { io } from "socket.io-client";
import store from "../store";
import { addMessage, errorMessage } from "../store/chatSlice";

const httpClient = axios.create({
    baseURL: "http://localhost:3000",
});

const socket = io("http://localhost:3000", {
    transports: ["websocket", "polling"],
});
//створюємо з'єднання з сервером; Якщо не вкажеш transports, клієнт спробує підключитися спочатку через polling, а потім оновить з'єднання до websocket, якщо сервер підтримує цей метод.Без transports клієнт буде працювати, але з'єднання може бути повільнішим, оскільки спочатку буде використовуватися polling, а лише потім — websocket. на сервері він не потрібен. 


export const getMessagesHomePage = () => httpClient.get("/");
export const createUser = (values) => httpClient.post("/users", values);

export const createNewMessage = (message) => socket.emit("newMessage", message);//emit-відправляє повідомлення на сервер;назву події "newMessage" ми беремо на сервері у файлі server/server.js)
socket.on("newMessage", (message) => {
    console.log("Received new message:", message); 
    store.dispatch(addMessage(message));
});//on-приймає повідомлення з сервера
socket.on("badMessage", (error) => {
    store.dispatch(errorMessage(error));
});
