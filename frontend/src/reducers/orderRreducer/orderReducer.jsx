import { createSlice } from '@reduxjs/toolkit';
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    USER_ORDERS_FAIL,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    ordersCount:0,
    message:""
};

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CREATE_ORDER_REQUEST, (state) => {
                state.loading = true;
                state.orders = [];
            })
            .addCase(CREATE_ORDER_SUCCESS, (state, action) => {
                state.loading = false;
                state.orders = action.payload.order;
                state.ordersCount=action.payload.order.length;
            })
            .addCase(CREATE_ORDER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) .addCase(USER_ORDERS_REQUEST, (state) => {
                state.loading = true;
                state.orders = [];
            })
            .addCase(USER_ORDERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.ordersCount=action.payload.orders.length;
            })
            .addCase(USER_ORDERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = orderSlice.actions;

export default orderSlice.reducer;

