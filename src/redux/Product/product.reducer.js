import productTypes from "./product.type";

const INITIAL_STATE = {
    addProductSuccess: false,
    products: []
}

const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case productTypes.ADD_NEW_PRODUCT_SUCCESS:
            return ({
                ...state,
                addProductSuccess: true,
            })

        case productTypes.SET_PRODUCTS:
            return ({
                ...state,
                products: action.payload,
            })

        default:
            return state
    }
}

export default productReducer;