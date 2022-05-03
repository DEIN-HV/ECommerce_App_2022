import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signInFalse: false,
    signInMess: [],
    signUpSuccess: false,
    signUpError: [],
    resetPasswordSuccess: false,
    resetPasswordError: [],
}

const userReducer = (state = INITIAL_STATE, action) => {
    console.log(state = INITIAL_STATE, action)
    switch (action.type) {

        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }

        case userTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
            }

        case userTypes.SIGNIN_FALSE:
            return {
                ...state,
                signInFalse: true,
                signInMess: action.payload,
            }

        case userTypes.SIGNOUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
            }

        case userTypes.SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                signUpSuccess: action.payload,
            }

        case userTypes.SIGN_UP_USER_ERROR:
            return {
                ...state,
                signUpError: action.payload,
            }

        // DELETE-----------------------------
        case userTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                signInSuccess: action.payload,
            }

        case userTypes.SIGNUP_ERROR:
            return {
                ...state,
                signUpError: action.payload,
            }

        case userTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload,
            }

        case userTypes.RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.payload,
            }

        case userTypes.RESET_AUTH_FORMS:
            return {
                ...state,
                signInSuccess: false,
                signInFalse: false,
                signInMess: [],
                signUpSuccess: false,
                signUpError: [],
                resetPasswordSuccess: false,
                resetPasswordError: [],
            }
        default:
            return state;
    }
}

export default userReducer;