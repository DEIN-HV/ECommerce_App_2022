import { takeLatest, all, call, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import productTypes, { } from "../../redux/Product/product.type"
import { handleAddProduct } from "./product.helper";

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc
} }) {
    const timestamp = new Date();
    yield handleAddProduct(
        {
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productDesc,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        })
}

export function* onAddProductStart() {
    console.log("onAddProductStart")
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productSaga() {
    console.log("productSaga")
    yield all([
        call(onAddProductStart)
    ])
}