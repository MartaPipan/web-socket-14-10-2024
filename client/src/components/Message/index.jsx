import PropTypes from 'prop-types';

const Message = ({
    message: { content, userId: { login }}
}) => {
    return (
        <article>
            <h3>{content}</h3>
            <p>Message from: {login}</p>
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
        uniqueId: PropTypes.string.isRequired, // Оскільки uniqueId завжди буде присутнім
    }).isRequired,
};

export default Message;


//Example:
//  "data": [
//    {
      //"isRead": false,
     // "_id": "67aaf3899626dfc955c80ec2",
     // "content": "Hello, how are you today?",
     // "userId": {
     //   "_id": "67aaee0f984a57e437e4e0b4",
     //   "login": "bob"
     // },
    //  "uniqueId": "8c91d4ec-cb0e-43a7-954a-eb3ae68d3eba"
//},
    
