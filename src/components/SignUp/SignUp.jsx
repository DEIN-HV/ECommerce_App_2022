import { Component } from "react";
import FormInput from "../Form/FormInput";
import "./styles.scss";
import Button from "../Form/Button";
import { auth, handleUserProfile } from "../../firebase/utils";

const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],

}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    // handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    // handleFormSubmit = async e => {

    //     e.preventDefault();

    //     const { displayName, email, password, confirmPassword, errors } = this.state;
    //     if (password !== confirmPassword) {
    //         const err = ["password don't match"];

    //         this.setState({
    //             errors: err,
    //         });
    //         console.log(errors.length)
    //         return;
    //     }

    //     try {
    //         const { user } = await auth.createUserWithEmailAndPassword(email, password);
    //         await handleUserProfile(user, { displayName });
    //         this.setState(
    //             {
    //                 ...initialState
    //             }
    //         )
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    render() {
        const { displayname, email, password, confirmPassword, errors } = this.state;

        return (
            <div className="signUp">
                {/* <div className="wrap">
                    <h2>Signup</h2>
                </div>

                <div className="formWrap">

                    <form onSubmit={this.handleFormSubmit}>

                        <FormInput
                            type="text"
                            name="displayname"
                            value={displayname}
                            placeholder="Full name"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="email "
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                        />

                        {errors.length > 0 &&
                            (<ul>
                                {errors.map((err) => (
                                    <div>
                                        {err}
                                    </div>
                                ))}
                            </ul>
                            )
                        }

                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                </div> */}
            </div>
        )
    }

}

export default SignUp