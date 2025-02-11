import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../store/chatSlice';
import Message from '../Message';

const MessageList = () => {
    const { messages, isPending, error } = useSelector((store) => store.chat);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllMessages()); 
    }, [dispatch]);

    // Розгорнута функція для рендерингу повідомлень
    const showMessages = (message) => {
        // Використовуємо тільки унікальний _id, щоб уникнути дублювання ключів
        const messageKey = `${message.uniqueId}`;
        return (
            <Message
                key={messageKey}   // Використовуємо комбінований ключ
                message={message}    // передаємо повідомлення у компонент Message
            />
        );
    };

    if (isPending) {
        return <p>Loading messages...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section>
            {messages.length === 0 
                ? <p>No messages available</p>
                : messages.map(showMessages)  // Викликаємо showMessages для кожного повідомлення
            }
        </section>
    );
};

export default MessageList;
