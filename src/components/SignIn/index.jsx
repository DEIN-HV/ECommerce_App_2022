import Button from "../Form/Button";
import "./styles.scss";
import { auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth"
import { Component, useEffect, useState } from "react"
import FormInput from "../Form/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthForms, signInUser, signInWithGoogle } from "../../redux/User/user.actions"

const initialState = {
    email: "",
    password: "",
    errors: ""
}

const mapStateSuccess = ({ user }) => ({
    signInSuccess: user.signInSucess
})

const mapStateFalse = ({ user }) => ({
    signInFalse: user.signInFalse,
    signInMess: user.signInMess,
})

const SignIn = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signInSuccess } = useSelector(mapStateSuccess);
    const { signInFalse, signInMess } = useSelector(mapStateFalse);

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAuthForms());
            navigate("/");
        }
    }, [signInSuccess]);

    useEffect(() => {
        if (signInFalse) setErrors(signInMess)
    }, [signInFalse]);

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrors([]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(signInUser(email, password))
    }

    const handleSignInWithGoogle = () => {
        dispatch(signInWithGoogle());
    }

    return (
        <AuthWrapper headline="login page">

            <form className="formWrap" onSubmit={handleSubmit}>
                <FormInput type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={(e) => setEmail(e.target.value)}

                />
                <FormInput type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    handleChange={(e) => setPassword(e.target.value)}
                />

                {/* error message */}
                {errors &&
                    <ul className="errorMess">
                        {errors.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                }

                <Button type="submit">
                    Login
                </Button>

                {/* SignIn with google */}
                <div className="socialSignIn">
                    <div className="row">
                        <Button onClick={handleSignInWithGoogle}>
                            Sign in with Google
                        </Button>
                    </div>
                </div>

                <div className="forgotPassword">
                    <Link to="/recovery">
                        <span className="forgotPasswordText">Forgot Password</span>
                    </Link>
                </div>
            </form>
        </AuthWrapper>

    )
}


export default SignIn