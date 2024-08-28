import { createSlice } from '@reduxjs/toolkit';
import {
    CART_PRODUCTS_FAIL,
    CART_PRODUCTS_REQUEST,
    CART_PRODUCTS_SUCCESS,
    DELETE_ALL_CART_PRODUCTS_FAIL,
    DELETE_ALL_CART_PRODUCTS_REQUEST,
    DELETE_ALL_CART_PRODUCTS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    products: [],
    price: 0,
    gst: 0,
    discount: 0,
    delivery: 0,
    total: 0,
    loading: false,
    productsCount: 0,
    error: null,
    success:null
};


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CART_PRODUCTS_REQUEST, (state) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(CART_PRODUCTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productsCount = action.payload.products.length || 0;
                state.price= action.payload.price;
                state.gst = action.payload.gst;
                state.discount = action.payload.discount;
                state.delivery = action.payload.delivery;
                state.total = action.payload.total;
                state.success=action.payload.success;
            })
            .addCase(CART_PRODUCTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(DELETE_ALL_CART_PRODUCTS_REQUEST, (state) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(DELETE_ALL_CART_PRODUCTS_SUCCESS, (state, action) => {
                state=initialState
            })
            .addCase(DELETE_ALL_CART_PRODUCTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors,clearSuccess } = cartSlice.actions;

export default cartSlice.reducer;

