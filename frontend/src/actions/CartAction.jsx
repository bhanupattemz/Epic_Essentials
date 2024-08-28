import axios from 'axios';
import {
    CART_PRODUCTS_FAIL,
    CART_PRODUCTS_REQUEST,
    CART_PRODUCTS_SUCCESS,
} from '../constants/Constants';
const axiosInstance = axios.create({
    baseURL: '/api/v1/'
})
axiosInstance.defaults.withCredentials = true;
const getCartProducts = () => async (dispatch) => {
    try {
        dispatch({ type: CART_PRODUCTS_REQUEST });
        const response = await axiosInstance.get("cart")
        dispatch({
            type: CART_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const addCartProducts = (params, quantity) => async (dispatch) => {
    try {
        dispatch({ type: CART_PRODUCTS_REQUEST });
        console.log(params)
        const response = await axiosInstance.post(`cart/${params}`, params = { quantity })
        dispatch({
            type: CART_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const removeCartProduct = (params) => async (dispatch) => {
    try {
        dispatch({ type: CART_PRODUCTS_REQUEST });
        const response = await axiosInstance.delete(`cart/${params}`)
        dispatch({
            type: CART_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const removeAllCartProduct = (params) => async (dispatch) => {
    try {
        dispatch({ type: CART_PRODUCTS_REQUEST });
        const response = await axiosInstance.delete(`cart`)
        dispatch({
            type: CART_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CART_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export { getCartProducts, addCartProducts, removeCartProduct, removeAllCartProduct }