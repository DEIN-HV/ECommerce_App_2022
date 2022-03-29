import { Component, useState } from "react";
import FormInput from "../Form/FormInput";
import "./styles.scss";
import Button from "../Form/Button";
import { auth, handleUserProfile } from "../../firebase/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthWrapper from "../AuthWrapper"

const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
}

const SignUp = props => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const resetValue = () => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const err = ["Password doesn't match"];
            setErrors(err);
            return;
        };

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await handleUserProfile(user, { displayName });
            resetValue();

        } catch (error) {
            console.log(error)
        }
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
            </div>
        </AuthWrapper>
    )
}

export default SignUp