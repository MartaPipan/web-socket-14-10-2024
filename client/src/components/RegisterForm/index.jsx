import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../store/userSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const error = useSelector((store) => store.user.error);

    //eslint-disable-next-line
    const onSubmit = (values, formikBag) => {
        dispatch(authUser(values));
    };
    
    return (
        <Formik
            initialValues={{
                login: '',
                email: '',
            }}
            validationSchema={Yup.object({
                login: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
            })}
            onSubmit = {onSubmit}>
            <Form>
                <label>
                    <span>Login</span>
                    <Field type="text" name="login" />
                    <ErrorMessage name="login" />
                </label>
                <label>
                    <span>Email</span>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" />
                </label>
                <button type="submit">Register</button>
                {error && <p>{error}</p>}
            </Form>
        </Formik>
    );
};

export default RegisterForm;