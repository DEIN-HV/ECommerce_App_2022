import {takeLatest, all, call, put} from "redux-saga/effects";
import productTypes, {} from "../../redux/Product/product.type"

export function* addProduct(){

}

export function* onAddProduct(){
    takeLatest(productTypes.ADD_NEW_PRODUCT_START,addProduct)
}

export function* productSaga(){
     
}