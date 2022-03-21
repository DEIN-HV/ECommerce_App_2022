import Button from "../Form/Button";
import "./styles.scss";
import { signInWithGoogle, auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth"
import { Component } from "react"
import FormInput from "../Form/FormInput";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
    errors: ""
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    this.setState = {
                        ...initialState
                    }
                })
                .catch(() => {
                    const err = ["Email or Password is wrong"];
                    this.setState({
                        ...initialState,
                        errors: err,
                    })
                })

        } catch (error) {
            console.log("error", error);

        }
    }
    render() {
        const { email, password, errors } = this.state;
        return (
            <AuthWrapper headline="login page">

                <form className="formWrap" onSubmit={this.handleSubmit}>
                    <FormInput type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={this.handleChange}

                    />
                    <FormInput type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={this.handleChange}
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
}

export default SignIn