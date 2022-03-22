import Button from "../Form/Button";
import "./styles.scss";
import { signInWithGoogle, auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth"
import { Component, useState } from "react"
import FormInput from "../Form/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
    errors: ""
}

const SignIn = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...initialState
    //     }

    //     this.handleChange = this.handleChange.bind(this)
    // }

    // handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value,
    //     })
    // }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrors([]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(email, password)

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    resetForm();
                })
                .catch(() => {
                    const err = ["Email or Password is wrong"];
                    setErrors(err)
                })

        } catch (error) {
            console.log(error);

        }
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
                        <Button onClick={signInWithGoogle}>
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