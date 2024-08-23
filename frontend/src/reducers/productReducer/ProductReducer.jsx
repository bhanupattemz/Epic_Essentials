import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialProductsState = {
    products: null,
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
                state.products=[]
            })
            .addCase(ALL_PRODUCTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.productsCount=action.payload.results
                
            })
            .addCase(ALL_PRODUCTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(ADMIN_DELETE_PRODUCT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_DELETE_PRODUCT_SUCCESS, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
                state.productsCount=action.payload.results
                
            })
            .addCase(ADMIN_DELETE_PRODUCT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(ADMIN_CREATE_PRODUCT_REQUEST, (state) => {
                state.loading = true;
                state.products=[]
            })
            .addCase(ADMIN_CREATE_PRODUCT_SUCCESS, (state, action) => {
                state.loading = false;
                state.products.push(action.payload.data)
                state.productsCount=action.payload.results
                
            })
            .addCase(ADMIN_CREATE_PRODUCT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(ADMIN_UPDATE_PRODUCT_REQUEST, (state) => {
                state.loading = true;
                state.products=[]
            })
            .addCase(ADMIN_UPDATE_PRODUCT_SUCCESS, (state, action) => {
                state.loading = false;
                state.products=action.payload.data
                state.productsCount=action.payload.results
                
            })
            .addCase(ADMIN_UPDATE_PRODUCT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = productSlice.actions;

export default productSlice.reducer;

