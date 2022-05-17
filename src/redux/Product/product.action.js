import productTypes from "./product.type";

export const addProductStart = (productData) =>({
    type: productTypes.ADD_NEW_PRODUCT_START,
    payload: productData,
});