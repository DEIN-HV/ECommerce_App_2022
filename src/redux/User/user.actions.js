import userTypes from "./user.types";
import { auth, handleUserProfile, googleProvider } from "../../firebase/utils"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup
} from "firebase/auth"

export const emailSignInStart = userCredentails => ({
    type: userTypes.EMAIL_SIGNIN_START,
    payload: userCredentails,
});

export const signInSuccess = user => ({
    type: userTypes.SIGNIN_SUCCESS,
    payload: user,
})

export const checkUserAction = () => ({
    type: userTypes.CHECK_USER_SESSION,
})

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user,
});

export const signOutStart = () => ({
    type: userTypes.SIGNOUT_USER_START,
});

export const signOutSuccess = () => ({
    type: userTypes.SIGNOUT_USER_SUCCESS,
});

export const signUpStart = (userCredentials) => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials,
});

export const signUpSuccess = (user) => ({
    type: userTypes.SIGN_UP_USER_SUCCESS,
    payload: user,
});

export const signUpError = (err) => ({
    type: userTypes.SIGN_UP_USER_ERROR,
    payload: err,
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
        // const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        dispatch({
            type: userTypes.SIGNUP_SUCCESS,
            payload: true,
        });

        await handleUserProfile(user, { displayName });

    } catch (error) {
        console.log(error);
        const err = ["User or email already in use"];
        dispatch({
            type: userTypes.SIGNUP_ERROR,
            payload: err,
        });
    }
}

export const resetPassword = ({ auth, email, config }) => async dispatch => {
    try {
        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true,
                })
            })
            .catch(() => {
                const err = ["Email was not found. Please try again."]
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                });
            });

    } catch (error) {
        console.log(error)
    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await signInWithPopup(auth, googleProvider)
            .then(() => {
                dispatch({
                    type: userTypes.SIGNIN_SUCCESS,
                    payload: true,
                })
            })
    } catch (error) {
        console.log(error)
    }
}

export const resetAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS,
})