import { createSlice } from '@reduxjs/toolkit';
import {
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    order: null,
    loading: false,
    error: null,
    ordersCount:0,
    message:""
};

const orderDetailsSlice = createSlice({
    name: 'ordersDetails',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ORDER_DETAILS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ORDER_DETAILS_SUCCESS, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.ordersCount=action.payload.order.length;
            })
            .addCase(ORDER_DETAILS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

