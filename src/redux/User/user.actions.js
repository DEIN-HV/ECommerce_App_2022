import userTypes from "./user.types";
import { auth, handleUserProfile } from "../../firebase/utils"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user,
});

export const signInUser = (email, password) => async dispatch => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                dispatch({
                    type: userTypes.SIGNIN_SUCCESS,
                    payload: true,
                })
            })
            .catch(() => {
                const err = ["Email or Password is wrong"];
                console.log(err)
                dispatch({
                    type: userTypes.SIGNIN_FALSE,
                    payload: err,
                })

            });
    } catch (error) {
        console.log(error)
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ["Password doesn't match"];

        dispatch({
            type: userTypes.SIGNUP_ERROR,
            payload: err,
        });
        return
    };

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        dispatch({
            type: userTypes.SIGNUP_SUCCESS,
            payload: true,
        });

        await handleUserProfile(user, { displayName });

    } catch (error) {
        console.log(error)
    }
}