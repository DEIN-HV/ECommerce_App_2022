import { signInWithEmailAndPassword } from "firebase/auth"
import { getDoc } from "firebase/firestore";
import { takeLatest, all, call, put } from "redux-saga/effects"
import { auth, handleUserProfile } from "../../firebase/utils"
import { signInSuccess } from "./user.actions";
import userTypes from "./user.types"

export function* getSnapshopFromUserAuth(user) {

    try {
        const userRef = yield call(handleUserProfile, { userAuth: user });
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
    try {
        yield signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
    }
}

export function* onEmailSigninStart() {
    yield takeLatest(userTypes.EMAIL_SIGNIN_START, emailSignin)
}

export default function* userSaga() {
    yield all([call(onEmailSigninStart)])
}