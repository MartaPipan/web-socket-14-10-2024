import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../store/chatSlice';
import Message from '../Message';

const MessageList = () => {
    const { messages, isPending, error } = useSelector((store) => store.chat);
    const dispatch = useDispatch();

    // Виконуємо `useEffect`, коли компонент монтується або змінюється `dispatch`
useEffect(() => {
    dispatch(getAllMessages()); // Викликаємо екшен для отримання всіх повідомлень з бекенду
}, [dispatch]); // Залежність `dispatch` гарантує, що ефект не буде перевиконуватись без потреби

    
// Виконуємо `useEffect`, коли змінюється довжина масиву `messages`
useEffect(() => {
    window.scrollTo({
        top: document.body.scrollHeight, // Прокручуємо сторінку вниз до кінця
        behavior: 'smooth' // Додаємо плавну анімацію скролу
    });
}, [messages.length]); // Залежність `messages.length`, щоб скрол відбувався при отриманні нових повідомлень



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
