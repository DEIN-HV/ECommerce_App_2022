import SignIn from "../../components/SignIn";
import AuthWrapper from "../AuthWrapper";
import { Component } from "react"
import "./styles.scss"
import FormInput from "../Form/FormInput";
import Button from "../Form/Button";
import { auth } from "../../firebase/utils"
import { sendPasswordResetEmail } from "firebase/auth";

const initialState = {
    email: "",
    errors: [],
}

class PasswordRecovery extends Component {
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
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;
            const config = {
                url: "http://localhost:3000/login",
            }

            await sendPasswordResetEmail(auth, email, config)
                .then(() => {
                    console.log("PW reset")
                })
                .catch(() => {
                    const err = ["Email was not found. Please try again."]
                    this.setState({
                        errors: err,
                    })
                })

        } catch (error) {
            console.log(error)
        }


    }

    render() {
        const { email, errors } = this.state;
        return (
            <AuthWrapper headline="Recovery">
                {errors &&
                    <ul>
                        {errors.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                }
                <form className="formWrap" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={this.handleChange} />

                    <Button type="submit">
                        Reset Password
                    </Button>
                </form>
            </AuthWrapper>
        )
    }
}

export default PasswordRecovery;