import { takeLatest, all, call, put } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import productTypes, { } from "../../redux/Product/product.type"
import { addProductSuccess, fetchProductStart, setProducts } from "./product.action";
import { handleAddProduct, handleDeleteProduct, handleFetchProduct } from "./product.helper";

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

    yield put(addProductSuccess());
    yield put(fetchProductStart())
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

//FETCH PRODUCT--------------------------------------------
export function* fetchProduct() {
    const products = yield handleFetchProduct();
    yield put(setProducts(products));
}

export function* onFetchProductStart() {
    yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct)
}

//DELETE PRODUCT-------------------------------------------

export function* deleteProduct({ payload: productId }) {
    yield handleDeleteProduct(productId);
    yield put(fetchProductStart());
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productSaga() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductStart),
        call(onDeleteProductStart),
    ])
}