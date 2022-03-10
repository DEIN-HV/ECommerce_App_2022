import SignIn from "../../components/SignIn";
import "./styles.scss"

const Login = props => {
    return (
        <div className="login">
            <h1>Login Page</h1>
            <SignIn />
        </div>
    )
}

export default Login