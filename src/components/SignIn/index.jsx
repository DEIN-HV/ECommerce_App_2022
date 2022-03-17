import Button from "../Form/Button";
import "./styles.scss";
import { signInWithGoogle, auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth"
import { Component } from "react"
import FormInput from "../Form/FormInput";

const initialState = {
    email: "",
    password: "",
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
            await signInWithEmailAndPassword(auth, email, password);
            this.setState = {
                ...initialState
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const { email, password } = this.state;
        return (
            <div className="singin">
                <div className="wrap">
                    <h2>Login</h2>
                </div>

                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>

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
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn