import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signInFalse: false,
    signInMess: [],
    signUpSuccess: false,
    signUpError: [],
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }

        case userTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                signInSuccess: action.payload,
            }

        case userTypes.SIGNIN_FALSE:
            return {
                ...state,
                signInFalse: true,
                signInMess: action.payload,
            }

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
        default:
            return state;
    }
}

export default userReducer;