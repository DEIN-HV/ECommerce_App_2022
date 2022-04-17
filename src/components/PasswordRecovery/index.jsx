import SignIn from "../../components/SignIn";
import AuthWrapper from "../AuthWrapper";
import { Component, useEffect, useState } from "react"
import "./styles.scss"
import FormInput from "../Form/FormInput";
import Button from "../Form/Button";
import { auth } from "../../firebase/utils"
import { sendPasswordResetEmail } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError,
})

const PasswordRecovery = () => {

    const [email, setEmail] = useState("");
    const [errMessage, setErrMessage] = useState([]);
    const [successMessage, setSuccessMessage] = useState([]);

    const dispatch = useDispatch();

    //create state message when reset success
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    console.log(resetPasswordError, resetPasswordSuccess);

    const resetMess = () => {
        setSuccessMessage([]);
        setErrMessage([]);
    }

    useEffect(() => {
        if (resetPasswordSuccess) {
            resetMess();
            const mess = ["Reset password success"];
            setSuccessMessage(mess);
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        resetMess();
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrMessage(resetPasswordError);
        }

    }, [resetPasswordError]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: "http://localhost:3000/login",
        }

        dispatch(resetPassword({ auth, email, config }))


        // try {
        //     const config = {
        //         url: "http://localhost:3000/login",
        //     }

        //     await sendPasswordResetEmail(auth, email, config)
        //         .then(() => {
        //             console.log("PW reset")
        //         })
        //         .catch(() => {
        //             const err = ["Email was not found. Please try again."]
        //             setErrors(err);
        //         })

        // } catch (error) {
        //     console.log(error)
        // }
    }
    return (
        <AuthWrapper headline="Recovery">
            <form className="formWrap" onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={(e) => setEmail(e.target.value)} />

                {errMessage &&
                    <ul className="errorMess">
                        {errMessage.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                }

                {successMessage &&
                    <ul className="successMess">
                        {successMessage.map((err) => (
                            <li>{err}</li>
                        ))}
                    </ul>
                }

                <Button type="submit">
                    Reset Password
                </Button>
            </form>
        </AuthWrapper>
    )
}

export default PasswordRecovery;