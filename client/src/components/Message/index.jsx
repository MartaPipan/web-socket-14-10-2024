import PropTypes from 'prop-types';
import DeleteMessage from '../DeleteMessage';

const Message = ({ message }) => {
    const { content, userId: { login } } = message;

    return (
        <article>
            <h3>{content}</h3>
            <p>Message from: {login}</p>
            {/* Delete button */}
            <DeleteMessage message={message} />
        </article>
    );
};

Message.propTypes = {
    message: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        userId: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            login: PropTypes.string.isRequired,
        }).isRequired,
        isRead: PropTypes.bool,
        uniqueId: PropTypes.string.isRequired, // Always present
    }).isRequired,
};

export default Message;
