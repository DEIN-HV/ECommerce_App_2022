import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import Button from "../Form/Button";
import FormInput from "../Form/FormInput";
import "./styles.scss";

const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
}

const mapStateSignUp = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const SignUp = props => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signUpSuccess, signUpError } = useSelector(mapStateSignUp);

    const resetValue = () => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
    }

    useEffect(() => {
        if (signUpSuccess) {
            resetValue();
            navigate("/");
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError)
        }
    }, [signUpError]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        dispatch(signUpUser({ displayName, email, password, confirmPassword }));
    }

    return (
        <AuthWrapper headline="registration">
            <div className="formWrap">

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayname"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={(e) => setDisplayName(e.target.value)}
                    />

                    <FormInput
                        type="email "
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {errors.length > 0 &&
                        (<ul className="errorMess">
                            {errors.map((err) => (
                                <li>
                                    {err}
                                </li>
                            ))}
                        </ul>
                        )
                    }

                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignUp