import { createSlice } from '@reduxjs/toolkit';
import {
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';


const initialProductDetailsState = {
    product: {},
    loading: false,
    error: null,
    success:null,
};

// Product Details Slice
const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: initialProductDetailsState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        }
    },
    extraReducers: (action) => {
        action
            .addCase(PRODUCTS_DETAILS_REQUEST, (state) => {
                state.loading = true;
                state.product = {};
            })
            .addCase(PRODUCTS_DETAILS_SUCCESS, (state, action) => {
                state.loading = false;
                state.product = action.payload.data;
            })
            .addCase(PRODUCTS_DETAILS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearErrors,clearSuccess } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
