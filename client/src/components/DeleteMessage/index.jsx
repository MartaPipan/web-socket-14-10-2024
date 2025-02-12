import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../store/chatSlice'; // Action to delete message

const DeleteMessage = ({ message }) => {
    const { _id } = message; // Extract _id from message prop
    const dispatch = useDispatch();

    // Function to handle message deletion
    const handleDelete = () => {
        try {
            // Dispatch action to delete message
            dispatch(deleteMessage(_id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red', marginLeft: '10px' }}>
            Delete
        </button>
    );
};

DeleteMessage.propTypes = {
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

export default DeleteMessage;
