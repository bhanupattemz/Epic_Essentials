import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_ALL_ORDERS_FAIL,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_UPDATE_ORDERS_FAIL,
    ADMIN_UPDATE_ORDERS_REQUEST,
    ADMIN_UPDATE_ORDERS_SUCCESS,
    ADMIN_DELETE_ORDERS_FAIL,
    ADMIN_DELETE_ORDERS_REQUEST,
    ADMIN_DELETE_ORDERS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    orders: null,
    loading: false,
    orderError: null,
    ordersCount:0,
    message:""
};

const orderDetailsSlice = createSlice({
    name: 'allOrders',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ADMIN_ALL_ORDERS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_ALL_ORDERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.ordersCount=action.payload.orders.length;
            })
            .addCase(ADMIN_ALL_ORDERS_FAIL, (state, action) => {
                state.loading = false;
                state.orderError = action.payload;
            }).addCase(ADMIN_UPDATE_ORDERS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_UPDATE_ORDERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.ordersCount=action.payload.orders.length;
            })
            .addCase(ADMIN_UPDATE_ORDERS_FAIL, (state, action) => {
                state.loading = false;
                state.orderError = action.payload;
            }).addCase(ADMIN_DELETE_ORDERS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_DELETE_ORDERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.ordersCount=action.payload.orders.length;
            })
            .addCase(ADMIN_DELETE_ORDERS_FAIL, (state, action) => {
                state.loading = false;
                state.orderError = action.payload;
            });
    },
});


export const { clearErrors } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

