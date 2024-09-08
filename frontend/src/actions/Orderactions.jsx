import axios from 'axios';
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    USER_ORDERS_FAIL,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ADMIN_ALL_ORDERS_FAIL,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_UPDATE_ORDERS_FAIL,
    ADMIN_UPDATE_ORDERS_REQUEST,
    ADMIN_UPDATE_ORDERS_SUCCESS,
    ADMIN_DELETE_ORDERS_FAIL,
    ADMIN_DELETE_ORDERS_REQUEST,
    ADMIN_DELETE_ORDERS_SUCCESS,
} from '../constants/Constants';
const axiosInstance = axios.create({
    baseURL: 'https://epic-essentials.onrender.com/api/v1/'
})
axiosInstance.defaults.withCredentials = true;
const createOrder = ( orderInfo, shippingInfo, paymentInfo) => async (dispatch) => {
    const orderItems=[]
    for (let item of orderInfo.products){
        orderItems.push(
            {
                name:item.product.name,
                price:item.product.price*item.quantity,
                quantity:item.quantity,
                image:item.product.images[0].url,
                product:item.product._id
            }
        )
    }
    try {
        console.log(paymentInfo)
        const data = {
            shippingInfo,
            orderItems,
            paymentInfo: {
                id: paymentInfo.paymentIntent.id,
                status: "paid",
            },
            itemPrice: orderInfo.price,
            taxPrice: orderInfo.gst,
            shippingPrice: orderInfo.delivery,
            totalPrice: orderInfo.total
        }
        dispatch({ type: CREATE_ORDER_REQUEST });
        const response = await axiosInstance.post("/order/new",data)
        console.log(response)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type:USER_ORDERS_REQUEST });
        const response = await axiosInstance("orders")
        dispatch({
            type:USER_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:USER_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const getOrderDetails= (_id) => async (dispatch) => {
    try {
        dispatch({ type:ORDER_DETAILS_REQUEST });
        const response = await axiosInstance(`order/${_id}`)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const cancelorderDetails= (_id) => async (dispatch) => {
    try {
        dispatch({ type:ORDER_DETAILS_REQUEST });
        const response = await axiosInstance.patch(`order/${_id}`)
        console.log(response)
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


const adminGetAllOrders= () => async (dispatch) => {
    try {
        dispatch({ type:ADMIN_ALL_ORDERS_REQUEST });
        const response = await axiosInstance.get(`admin/orders`)
        dispatch({
            type:ADMIN_ALL_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:ADMIN_ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminUpdateOrders= (params,_id) => async (dispatch) => {
    try {
        dispatch({ type:ADMIN_UPDATE_ORDERS_REQUEST });
        const response = await axiosInstance.put(`order/${_id}`,params)
        dispatch({
            type:ADMIN_UPDATE_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:ADMIN_UPDATE_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminDeleteOrders= (_id) => async (dispatch) => {
    try {
        dispatch({ type:ADMIN_DELETE_ORDERS_REQUEST });
        const response = await axiosInstance.delete(`order/${_id}`)
        dispatch({
            type:ADMIN_DELETE_ORDERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type:ADMIN_DELETE_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export { createOrder,getUserOrders,getOrderDetails, cancelorderDetails,adminDeleteOrders,adminGetAllOrders,adminUpdateOrders}