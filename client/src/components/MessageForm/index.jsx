import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from "yup";
import { createNewMessage} from '../../api';


const MessageForm = () => {
    const { user } = useSelector((store) => store.user);

    const validationSchema = Yup.object({
        content: Yup.string().trim().required("Message cannot be empty"),
    });
   
//eslint-disable-next-line
    const onSubmit = (values, formikBag) => {
        // Construct the message object with the user ID
        const message = { ...values, userId: user._id };
        // Send the new message using the API
        createNewMessage(message);
        formikBag.resetForm();
    };

    return (
        <Formik
            initialValues={{ content: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
                <Form>
                    <label>
                        <span>new message</span>
                        <Field
                            type="text"
                            name="content"
                            placeholder="Enter your message..."
                        />
                        <ErrorMessage name="content" />
                    </label>
                    <button type="submit">Send</button>
                </Form>
        </Formik>
    );
};

export default MessageForm;

