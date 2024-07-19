import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialProductsState = {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    currentPage:1
};

// Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ALL_PRODUCTS_REQUEST, (state) => {
                state.loading = true;
                state.products = [];
            })
            .addCase(ALL_PRODUCTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.productsCount=action.payload.results
                // state.currentPage=action.payload.currentPage
            })
            .addCase(ALL_PRODUCTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = productSlice.actions;

export default productSlice.reducer;

