import { useSelector } from "react-redux"
import RegisterForm from "../components/RegisterForm"


const HomePage = () => {
    const { user, error, isPending } = useSelector((store) => store.user);
    if (isPending) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error!!! {error}</p>;
    }
    if (user) {
        return (
            <div>
                <p>Hi, {user.login}!</p>
                {/* <MessageList/> */}
                {/* <MessageForm/> */}
            </div>
        );
    }
    return (
        <div>
            <h1>Registration</h1>
            <RegisterForm />
        </div>
    );
};


export default HomePage;