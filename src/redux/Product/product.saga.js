import { takeLatest, all, call, put } from "redux-saga/effects";
import productTypes, { } from "../../redux/Product/product.type"

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc
} }) {

}

export function* onAddProductStart() {
    takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export default function* productSaga() {
    all([
        call(onAddProductStart)
    ])
}