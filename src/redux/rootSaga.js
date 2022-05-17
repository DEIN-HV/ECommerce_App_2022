import { all, call } from "redux-saga/effects";
import productSaga from "./Product/product.saga";
import userSaga from "./User/user.sagas";

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(productSaga)
    ])
}