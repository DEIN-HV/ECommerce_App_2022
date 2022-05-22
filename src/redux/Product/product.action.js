import productTypes from "./product.type";

export const addProductStart = (productData) => ({
    type: productTypes.ADD_NEW_PRODUCT_START,
    payload: productData,
});

export const addProductSuccess = () => ({
    type: productTypes.ADD_NEW_PRODUCT_SUCCESS
});

export const fetchProductStart = () => ({
    type: productTypes.FETCH_PRODUCT_START,
});

export const setProducts = (products) => ({
    type: productTypes.SET_PRODUCTS,
    payload: products,
});

export const deleteProuctStart = (productId) => ({
    type: productTypes.DELETE_PRODUCT_START,
    payload: productId,
});