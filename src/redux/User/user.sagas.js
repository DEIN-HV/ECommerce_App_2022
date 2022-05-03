import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getDoc } from "firebase/firestore";
import { takeLatest, all, call, put } from "redux-saga/effects"
import { auth, getCurrentUser, handleUserProfile } from "../../firebase/utils"
import { signInSuccess, signOutSuccess, signUpError, signUpSuccess } from "./user.actions";
import userTypes from "./user.types"

export function* getSnapshopFromUserAuth(user, additionalData = {}) {
    console.log(user)
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield getDoc(userRef);
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
    } catch (error) {
        console.log(error)
    }
}

export function* emailSignin({ payload: { email, password } }) {
    console.log(email, password);
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        console.log(user)
        yield getSnapshopFromUserAuth(user)

    } catch (error) {
        console.log(error)
    }
}

export function* onEmailSigninStart() {
    yield takeLatest(userTypes.EMAIL_SIGNIN_START, emailSignin)
}

//CHECK USER ISAUTHENTICATED
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshopFromUserAuth(userAuth);
    } catch (error) {
        console.log(error)
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


//HANDLE SIGNOUT 
export function* handleUserSignOut() {
    yield auth.signOut()
    yield put(signOutSuccess())
}

export function* onUserSignOut() {
    yield takeLatest(userTypes.SIGNOUT_USER_START, handleUserSignOut)
}

//HANDLE SIGNUP
export function* handleSignUpUser({ payload: { displayName, email, password, confirmPassword } }) {

    if (password !== confirmPassword) {
        const err = ["Password doesn't match"];
        yield put(signUpError(err))
        return
    };

    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);
        // yield call(handleUserProfile, { userAuth: user, additionalData: { displayName } });
        const additionalData = { displayName }
        yield getSnapshopFromUserAuth(user, additionalData)

        // yield put(signUpSuccess(user))

    } catch (error) {
        const err = ["User or email already in use"];
        yield put(signUpError(err))
    }

}

export function* onSignUpUser() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, handleSignUpUser)
}

//MAIN FUCNTION
export default function* userSaga() {
    yield all([
        call(onEmailSigninStart),
        call(onCheckUserSession),
        call(onUserSignOut),
        call(onSignUpUser)])
}
