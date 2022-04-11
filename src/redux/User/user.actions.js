import userTypes from "./user.types";
import { auth } from "../../firebase/utils"
import { signInWithEmailAndPassword } from "firebase/auth"

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

    }
}