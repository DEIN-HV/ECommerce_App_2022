import SignIn from "../../components/SignIn";
import AuthWrapper from "../AuthWrapper";
import { Component, useState } from "react"
import "./styles.scss"
import FormInput from "../Form/FormInput";
import Button from "../Form/Button";
import { auth } from "../../firebase/utils"
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordRecovery = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ...initialState
    //     }
    //     this.handleChange = this.handleChange.bind(this)
    // }

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     this.setState({
    //         [name]: value
    //     })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                url: "http://localhost:3000/login",
            }

            await sendPasswordResetEmail(auth, email, config)
                .then(() => {
                    console.log("PW reset")
                })
                .catch(() => {
                    const err = ["Email was not found. Please try again."]
                    setErrors(err);
                })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthWrapper headline="Recovery">
            {errors &&
                <ul>
                    {errors.map((err) => (
                        <li>{err}</li>
                    ))}
                </ul>
            }
            <form className="formWrap" onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={(e) => setEmail(e.target.value)} />

                <Button type="submit">
                    Reset Password
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default PasswordRecovery;