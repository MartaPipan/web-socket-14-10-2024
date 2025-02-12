import axios from "axios";
import { io } from "socket.io-client";
import store from "../store";
import { addMessage, errorMessage } from "../store/chatSlice";
import constants from "../../utils/constants";

const{
    WS_EVENTS: {
        NEW_MSG,
        BAD_MSG,
        EDIT_MSG,
        DEL_MSG
    },
} = constants;  

const httpClient = axios.create({
    baseURL: "http://localhost:3000",
});

const socket = io("http://localhost:3000", {
    transports: ["websocket", "polling"],
});
//створюємо з'єднання з сервером; Якщо не вкажеш transports, клієнт спробує підключитися спочатку через polling, а потім оновить з'єднання до websocket, якщо сервер підтримує цей метод.Без transports клієнт буде працювати, але з'єднання може бути повільнішим, оскільки спочатку буде використовуватися polling, а лише потім — websocket. на сервері він не потрібен. 


export const getMessagesHomePage = () => httpClient.get("/");
export const createUser = (values) => httpClient.post("/users", values);

export const createNewMessage = (message) => socket.emit(NEW_MSG, message);//emit-відправляє повідомлення на сервер;назву події "newMessage" ми беремо на сервері у файлі server/server.js)
socket.on(NEW_MSG, (message) => {
    console.log("Received new message:", message); 
    store.dispatch(addMessage(message));
});//on-приймає повідомлення з сервера
socket.on(BAD_MSG, (error) => {
    store.dispatch(errorMessage(error));
});
socket.on(EDIT_MSG, (message) => {
    store.dispatch(addMessage(message));
});
socket.on(DEL_MSG, (message) => {
    store.dispatch(addMessage(message));
}); 
