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

    // Рендеримо повідомлення з унікальним ключем
    const showMessages = (message) => {
        const messageKey = message.uniqueId;  // Використовуємо лише унікальний ID
        return (
            <Message
                key={messageKey}
                message={message}
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
                : messages.map(showMessages)
            }
        </section>
    );
};


export default MessageList;
